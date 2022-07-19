import React from "react";
import "./App.css";
import { Box, Flex } from "@chakra-ui/react";
import TableComponent from "./components/table";

import { data } from "./data";

function App() {
  return (
    <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
      <Box minW="90%" w="1000px" h="90%">
        <TableComponent data={data} />
      </Box>
    </Flex>
  );
}

export default App;
