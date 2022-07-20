import "./App.css";

import { Box, Flex, Text } from "@chakra-ui/react";
import MoviesTable from "./components/movies-table";
import { useEffect, useState } from "react";
import { ReactComponent as LoadingIcon } from "./assets/loading.svg";
// import { data } from "./data";

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
        {loading ? (
          <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
            <LoadingIcon />
          </Flex>
        ) : error ? (
          <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
            <Text color="red">{error}</Text>
          </Flex>
        ) : (
          <MoviesTable data={data} />
        )}
      </Box>
    </Flex>
  );
}

export default App;
