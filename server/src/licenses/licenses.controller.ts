import { Body, Controller, Get, HttpException, HttpStatus, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AssignLicenseRequest, LicensesDto, Product } from './licenses.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { z, ZodSchema } from 'zod';
import { parseISO } from 'date-fns';

const randomNumber = (max: number) => Math.floor(Math.random() * max) + 1;

const randomDate = () => {
  if (randomNumber(3) === 3) return undefined;
  const month = randomNumber(12).toString().padStart(2, '0');
  const day = randomNumber(28).toString().padStart(2, '0');
  const tz = randomNumber(6).toString().padStart(2, '0');
  return `2023-${month}-${day}T00:00:00+${tz}:00`;
};

const generateRandomLicenses = (n: number) => {
  const generatedIds = new Set();
  const randomId = () => {
    const value = crypto.randomBytes(20).toString('hex').toUpperCase().slice(0, 12);
    if (!generatedIds.has(value)) {
      generatedIds.add(value);
      return value;
    }
    return randomId();
  };
  const randomProduct = {
    1: Product.Idea,
    2: Product.PyCharm,
    3: Product.WebStorm,
  };
  return Array(n)
    .fill(0)
    .map(() => ({
      id: randomId(),
      product: randomProduct[randomNumber(3)],
      lastSeen: randomDate(),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
};

const applyLastSeen = (data: LicensesDto[], le?: string, ge?: string) => {
  if (!le && !ge) return data;
  let result = data;
  if (le) {
    const dateLe = parseISO(le);
    result = result.filter((e) => (e.lastSeen ? parseISO(e.lastSeen) <= dateLe : false));
  }
  if (ge) {
    const dateGe = parseISO(ge);
    result = result.filter((e) => (e.lastSeen ? parseISO(e.lastSeen) >= dateGe : false));
  }
  return result;
};

const validate = (schema: ZodSchema, object: any) => {
  const validationResult = schema.safeParse(object);
  if (validationResult.success === false) {
    throw new HttpException(validationResult.error.flatten().fieldErrors, HttpStatus.BAD_REQUEST);
  }
};

type SortBy = '+id' | '-id' | '+assignedTo' | '-assignedTo' | '+product' | '-product' | '+lastSeen' | '-lastSeen';

const sortByFn = (data: LicensesDto[], sortBy: SortBy) => {
  if (sortBy === '+id') return data.sort((a, b) => a.id.localeCompare(b.id));
  if (sortBy === '-id') return data.sort((a, b) => b.id.localeCompare(a.id));
  if (sortBy === '+assignedTo') return data.sort((a, b) => a.assignedTo.localeCompare(b.assignedTo));
  if (sortBy === '-assignedTo') return data.sort((a, b) => b.assignedTo.localeCompare(a.assignedTo));
  if (sortBy === '+product') return data.sort((a, b) => a.product.localeCompare(b.product));
  if (sortBy === '-product') return data.sort((a, b) => b.product.localeCompare(a.product));
  if (sortBy === '+lastSeen') return data.sort((a, b) => a.lastSeen.localeCompare(b.lastSeen));
  if (sortBy === '-lastSeen') return data.sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));
};

@ApiTags('licenses')
@Controller('licenses')
export class LicensesController {
  licenses: LicensesDto[];

  constructor() {
    this.licenses = generateRandomLicenses(1000);
  }

  @ApiQuery({ name: 'pageIndex', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'lastSeenGe', required: false })
  @ApiQuery({ name: 'lastSeenLe', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'product', required: false, enum: Product, isArray: true })
  @Get('')
  getLicenses(
    @Res({ passthrough: true }) response: Response,
    @Query('pageIndex', new ParseIntPipe({ optional: true })) pageIndex: number = 0,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize: number = 10,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: SortBy,
    @Query('lastSeenGe') lastSeenGe?: string,
    @Query('lastSeenLe') lastSeenLe?: string,
    @Query('product') product?: Product[],
  ): LicensesDto[] {
    validate(
      z.object({
        pageIndex: z.number().nonnegative().optional(),
        pageSize: z.number().positive().optional(),
        search: z.string().optional(),
        lastSeenGe: z.string().datetime({ offset: true }).optional(),
        lastSeenLe: z.string().datetime({ offset: true }).optional(),
        product: z.union([z.array(z.nativeEnum(Product)), z.nativeEnum(Product)]).optional(),
      }),
      { pageIndex, pageSize, search, lastSeenLe, lastSeenGe, product },
    );

    const offset = pageSize * pageIndex;
    const searchApplied = search
      ? this.licenses.filter((e) => JSON.stringify(e).toLowerCase().includes(search.toLowerCase()))
      : this.licenses;
    const lastSeenFilterApplied = applyLastSeen(searchApplied, lastSeenLe, lastSeenGe);
    const productFilterApplied = product
      ? lastSeenFilterApplied.filter((e) => product.includes(e.product))
      : lastSeenFilterApplied;
    response.header('X-Total-Count', productFilterApplied.length.toString());

    const sorted = sortBy ? sortByFn(productFilterApplied, sortBy) : productFilterApplied;

    return sorted.slice(offset, offset + pageSize);
  }

  @Post('assign')
  assign(@Body() { ids, assignTo }: AssignLicenseRequest) {
    validate(z.object({ ids: z.array(z.string()).nonempty(), assignTo: z.union([z.null(), z.string()]) }), {
      ids,
      assignTo,
    });
    if (randomNumber(10) === 10) throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    ids.forEach((e) => {
      const found = this.licenses.find((l) => l.id === e);
      if (found) {
        assignTo === null ? delete found.assignedTo : (found.assignedTo = assignTo);
      }
    });
  }
}
