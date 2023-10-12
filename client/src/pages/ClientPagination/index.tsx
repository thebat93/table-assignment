import { useCallback, useEffect, useMemo, useState } from "react";
import { useLicenses } from "../../api/licenses/useLicenses";
import { useAssignLicense } from "../../api/licenses/useAssignLicense";
import { License } from "../../api/licenses/types";
import { getSortParam } from "../../api/licenses/utils";
import { Columns, Table, TableFooter } from "../../components/Table";
import { Filter } from "../../components/Filters";
import { useSearch } from "../../components/Filters/Search/useSearch";
import { SelectOption } from "../../components/Filters/Select";
import { AssignLicenseDialog } from "../shared/AssignLicenseDialog";
import { useDialog } from "../../components/Dialog/useDialog";
import { Button } from "../../components/Button";
import { useParams } from "../shared/hooks/useParams";
import { PRODUCTS_ENUM } from "../../api/licenses/const";
import { Dropdown } from "../../components/Dropdown";

import s from "./index.module.css";

type Key = keyof License;

// Changes:
// pageSize = MAX_ELEMENTS
// No pageIndex for query
const MAX_ELEMENTS = 1000;

const PRODUCTS_LIST = Object.values(PRODUCTS_ENUM);
const productList: SelectOption[] = PRODUCTS_LIST.map((product) => ({
  label: product,
  value: product,
}));


const columns: Columns<License, Key> = {
  id: {
    label: "License ID",
    renderData: (license) => license.id,
  },
  product: {
    label: "Product",
    renderData: (license) => license.product,
  },
  assignedTo: {
    label: "Assigned To",
    renderData: (license) => license.assignedTo,
  },
  lastSeen: {
    label: "Last Seen",
    renderData: (license) =>
      license.lastSeen ? new Date(license.lastSeen).toLocaleString() : null,
  },
} as const;

const getRowId = (row: License) => row.id;

const ClientPagination = () => {
  const { params, setParams } = useParams();

  const [product, setProduct] = useState(params.product);
  const [lastSeenGe, setLastSeenGe] = useState(params.lastSeenGe);
  const [lastSeenLe, setLastSeenLe] = useState(params.lastSeenLe);

  const { isOpen, open: openDialog, close: closeDialog } = useDialog();

  const { setData, rows, columnsOrder, selection, pagination, sorting } =
    Table.useTable<License, Key>({
      id: "client-pagination-table",
      columns,
      defaultData: [],
      defaultPageIndex: params.pageIndex,
      defaultPageSize: params.pageSize,
      getRowId,
      defaultSortBy: params.sortBy.field,
      defaultSortDirection: params.sortBy.sortDirection,
    });

  const {
    page,
    pageSize,
    isNextActive,
    isPreviousActive,
    goNextPage,
    goPreviousPage,
    setTotal,
    setPage,
  } = pagination;

  const {
    selectedIds,
    onChangeSelectionAll,
    onChangeSelection,
    setSelectedIds,
  } = selection;

  const {
    currentOrder,
    setCurrentOrder,
    defaultOrder,
    removeColumn,
    addColumn,
  } = columnsOrder;

  const { toggleSortDirection, sortBy, setSortBy, sortDirection } = sorting;

  const onDebouncedSearchChange = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const { search, debouncedSearch, onSearch } = useSearch({
    defaultSearch: params.search,
    onDebouncedSearchChange,
  });

  const { mutateAsync: assignLicenses } = useAssignLicense();

  const { data, isError, isLoading, isFetching } = useLicenses({
    pageSize: MAX_ELEMENTS,
    sortBy,
    sortDirection,
    search: debouncedSearch,
    product: product ? [product] : undefined,
    lastSeenGe: lastSeenGe ? new Date(lastSeenGe) : undefined,
    lastSeenLe: lastSeenLe ? new Date(lastSeenLe) : undefined,
  });

  const onSubmitForm = useCallback(
    async (name: string) => {
      await assignLicenses({ ids: [...selection.selectedIds], assignTo: name });
      setSelectedIds(new Set());
    },
    [assignLicenses, selection.selectedIds, setSelectedIds]
  );

  useEffect(() => {
    setParams({
      search: debouncedSearch,
      product,
      lastSeenGe,
      lastSeenLe,
      pageIndex: String(page - 1),
      pageSize: String(pageSize),
      sortBy: getSortParam({ sortBy, sortDirection }),
    });
  }, [
    debouncedSearch,
    product,
    lastSeenGe,
    lastSeenLe,
    setParams,
    page,
    pageSize,
    sortBy,
    sortDirection,
  ]);

  useEffect(() => {
    if (data) {
      setData(data.licenses);
      setTotal(data.total);
    }
  }, [data, setData, setTotal]);

  const columnsMenu = useMemo(
    () =>
      defaultOrder.map((defaultOrderKey) => ({
        key: defaultOrderKey,
        id: `column_${defaultOrderKey}`,
        label: columns[defaultOrderKey].label,
        isChecked: currentOrder.includes(defaultOrderKey),
        onChange: currentOrder.includes(defaultOrderKey)
          ? () => removeColumn(defaultOrderKey)
          : () => addColumn(defaultOrderKey),
      })),
    [currentOrder, defaultOrder, addColumn, removeColumn]
  );

  return (
    <main className={s.wrapper}>
      <div className={s.filters}>
        <Filter.Search
          placeholder="Search by license ID or assignee"
          id="search"
          name="search"
          value={search}
          onSearch={onSearch}
          className={s.searchFilter}
        />
        <Filter.Select
          name="product"
          id="product"
          placeholder="Select a product"
          value={product}
          onSelect={setProduct}
          options={productList}
        />
        <div className={s.dateFilters}>
          <Filter.DateInput
            label="Last seen:"
            id="date1"
            name="date1"
            value={lastSeenGe}
            onSelect={setLastSeenGe}
          />
          {"..."}
          <Filter.DateInput
            id="date2"
            name="date2"
            value={lastSeenLe}
            onSelect={setLastSeenLe}
          />
        </div>
      </div>
      <div className={s.tableToolbar}>
        <Button
          onClick={openDialog}
          isDisabled={selectedIds.size === 0}
          className={s.assignLicensesButton}
        >
          Assign license(s)
        </Button>
        <Dropdown label="Columns" align="right">
          <div className={s.menu}>
            {columnsMenu.map((menuConfig) => (
              <div key={menuConfig.key}>
                <label>
                  <input
                    id={menuConfig.id}
                    name={menuConfig.id}
                    type="checkbox"
                    disabled={currentOrder.length === 1 && menuConfig.isChecked}
                    checked={menuConfig.isChecked}
                    onChange={menuConfig.onChange}
                  />
                  {menuConfig.label}
                </label>
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
      <Table className={s.table}>
        <Table.Header<Key>
          order={currentOrder}
          setColumnsOrder={setCurrentOrder}
          isAllSelected={selectedIds.size === rows.length}
          onChangeSelectionAll={onChangeSelectionAll}
        >
          {currentOrder.map((columnKey, index) => (
            <Table.HeaderCell<Key>
              key={columnKey}
              columnKey={columnKey}
              index={index}
              isSorting={columnKey === sortBy}
              setSorting={setSortBy}
              toggleSortDirection={toggleSortDirection}
            >
              {columns[columnKey].label}
            </Table.HeaderCell>
          ))}
        </Table.Header>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {!isLoading &&
          !isError &&
          rows.map((rowData) => (
            <Table.Row
              key={rowData.id}
              id={rowData.id}
              isSelected={selectedIds.has(rowData.id)}
              onChangeSelection={onChangeSelection}
            >
              {currentOrder.map((columnKey) => (
                <Table.RowCell key={columnKey}>
                  {columns[columnKey].renderData(rowData)}
                </Table.RowCell>
              ))}
            </Table.Row>
          ))}
      </Table>
      <TableFooter>
        <TableFooter.SelectionStatus
          rowsCount={rows.length}
          selectionCount={selectedIds.size}
        />
        <div className={s.paginationButtons}>
          <TableFooter.PaginationButton
            isDisabled={!isPreviousActive || isFetching}
            onClick={goPreviousPage}
          >
            Previous
          </TableFooter.PaginationButton>
          <TableFooter.PaginationButton
            isDisabled={!isNextActive || isFetching}
            onClick={goNextPage}
          >
            Next
          </TableFooter.PaginationButton>
        </div>
      </TableFooter>
      <AssignLicenseDialog
        isOpen={isOpen}
        onSubmit={onSubmitForm}
        onClose={closeDialog}
      />
    </main>
  );
};

export { ClientPagination };
