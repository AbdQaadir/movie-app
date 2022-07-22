import "./App.css";

import { Box, Flex } from "@chakra-ui/react";
import MoviesTable from "./components/movies-table/movies-table";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      fetch("https://tender-mclean-00a2bd.netlify.app/web/movies.json")
        .then((response) => response.json())
        .then((responseJson) => {
          setData(responseJson);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setLoading(false));
    };

    fetchData();
  }, []);

  return (
    <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
      <Box minW="90%" w="1000px" h="90%">
        <MoviesTable data={data} error={error} loading={loading} />
      </Box>
    </Flex>
  );
}

export default App;
