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
  useDisclosure,
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
import { Movie } from "../types";
import CommentsModal from "./comments-modal";

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

function MoviesTable({ data }: TTable) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tableData, setTableData] = React.useState(() => [...data]);
  const [searchParam, setSearchParam] = React.useState("");
  const [genre, setGenre] = React.useState("All");
  const [selectedMovie, setSelectedMovie] = React.useState("");

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
    <>
      {isOpen && (
        <CommentsModal
          title={selectedMovie}
          isOpen={!!selectedMovie && isOpen}
          onClose={() => {
            setSelectedMovie("");
            onClose();
          }}
        />
      )}

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
                      onClick={() => {
                        onOpen();
                        setSelectedMovie(cell.getValue());
                      }}
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

export default MoviesTable;
