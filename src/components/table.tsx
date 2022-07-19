import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DebounceInput } from "react-debounce-input";
import { Movie } from "../types";

const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "title",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.year,
    id: "year",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Year</span>,
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "runtime",
    header: () => "Runtime",
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "revenue",
    header: () => <span>Revenue</span>,
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "genre",
    header: "Genre",
    footer: (info) => info.column.id,
  },
];

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
];

type TTable = {
  data: Movie[];
};

function TableComponent({ data }: TTable) {
  const [tableData, setTableData] = React.useState(() => [...data]);
  const [searchParam, setSearchParam] = React.useState("");
  const [genre, setGenre] = React.useState("All");

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const filterMoviesByName = React.useCallback(() => {
    setTableData(() => {
      return data?.filter((row) =>
        row.title.toLowerCase().includes(searchParam.toLowerCase())
      );
    });
  }, [searchParam, data]);

  const filterMoviesByGenre = React.useCallback(() => {
    if (!genre || genre === "All") {
      setTableData(data);
      return;
    }
    setTableData(() => {
      return data?.filter((row) => row.genre.includes(genre));
    });
  }, [genre, data]);

  React.useEffect(() => {
    filterMoviesByGenre();
  }, [genre, filterMoviesByGenre]);

  React.useEffect(() => {
    filterMoviesByName();
  }, [searchParam, filterMoviesByName]);

  return (
    <TableContainer
      w="100%"
      h="100%"
      overflowY="scroll"
      p={3}
      overflow="hidden"
      border="1px solid gray"
      borderRadius="10px"
    >
      <Table variant="striped" colorScheme="gray">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
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
                onChange={(event) => setSearchParam(event.target.value)}
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
                onChange={(event) => setGenre(event.target.value)}
              >
                <option key="option" value="All">
                  All
                </option>
                {genres?.map((option) => {
                  return (
                    <option key="option" value={option}>
                      {option}
                    </option>
                  );
                })}
              </Select>
            </Td>
          </Tr>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <Tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
