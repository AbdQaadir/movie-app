import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Select,
  Button,
  Flex,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DebounceInput } from "react-debounce-input";
import { Movie } from "../../types";

type TTable = {
  data: Movie[];
  filterOptions: string[];
  columns: ColumnDef<Movie>[];
  onRowClick: (title: string) => void;
  handleSearch: (title: string) => void;
  handleFilter: (genre: string) => void;
};

function TableComponent({
  data,
  filterOptions,
  columns,
  onRowClick,
  handleSearch,
  handleFilter,
}: TTable) {
  const table = useReactTable({
    data: data,
    columns,
    initialState: { pagination: { pageSize: 30 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  console.log({ table: table.getState() });
  return (
    <>
      <TableContainer
        w="100%"
        h="100%"
        overflowY="scroll"
        p={3}
        pt={0}
        border="1px solid gray"
        borderRadius="10px"
      >
        <Table h="100%" variant="striped" colorScheme="gray">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr
                key={headerGroup.id}
                pt={3}
                position="sticky"
                top={0}
                zIndex={1}
                background="#fff"
              >
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} textTransform="capitalize">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <DebounceInput
                  style={{ borderColor: "#ccc" }}
                  minLength={2}
                  element={Input}
                  placeholder="Filter by Title"
                  debounceTimeout={300}
                  onChange={(event) => handleSearch(event.target.value)}
                />
              </Td>
              {Array(columns.length - 2)
                .fill("")
                .map((item, index) => {
                  return <Td key={index}>&nbsp;</Td>;
                })}
              <Td>
                <Select
                  placeholder="Filter by Genre"
                  onChange={(event) => handleFilter(event.target.value)}
                >
                  <option key="option" value="All">
                    All
                  </option>
                  {filterOptions?.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </Select>
              </Td>
            </Tr>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return cell.column.id === "title" ? (
                    <Td
                      key={cell.id}
                      onClick={() => onRowClick(cell.getValue())}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ) : (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex py={5} justifyContent="flex-end" w="100%" gap={3}>
          <Button
            colorScheme="blue"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
        </Flex>
      </TableContainer>
    </>
  );
}

export default TableComponent;
