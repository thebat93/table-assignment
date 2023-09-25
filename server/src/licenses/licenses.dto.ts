import { IsArray, IsNotEmpty } from 'class-validator';

export enum Product {
  Idea = 'II',
  WebStorm = 'WS',
  PyCharm = 'PC',
}

export class LicensesDto {
  id: string;
  assignedTo?: string;
  product: Product;
  lastSeen?: string;
}

export class AssignLicenseRequest {
  ids: string[];
  assignTo: string | null;
}
