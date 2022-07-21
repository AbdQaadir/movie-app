import * as React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { Movie } from "../types";
import CommentsModal from "./comments-modal";
import TableComponent from "./table-component";
import ErrorMsg from "./error-msg";
import LoadingSpinner from "./loading-spinner";
import TablePreview from "./table-preview";

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
  error: string;
  loading: boolean;
};

function MoviesTable({ data, error, loading }: TTable) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tableData, setTableData] = React.useState(() => [...data]);
  const [searchParam, setSearchParam] = React.useState("");
  const [genre, setGenre] = React.useState("All");
  const [selectedMovie, setSelectedMovie] = React.useState("");

  const onRowClick = (title: string) => {
    onOpen();
    setSelectedMovie(title);
  };
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

      {loading ? (
        <TablePreview columns={columns}>
          <LoadingSpinner />
        </TablePreview>
      ) : error ? (
        <TablePreview columns={columns}>
          <ErrorMsg error={error} />
        </TablePreview>
      ) : (
        <TableComponent
          data={tableData}
          columns={columns}
          filterOptions={genres}
          onRowClick={onRowClick}
          handleSearch={setSearchParam}
          handleFilter={setGenre}
        />
      )}
    </>
  );
}

export default MoviesTable;
