import React from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { Box, Flex } from "@chakra-ui/react";
import TableComponent from "./components/table";

import { data } from "./data";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [dataa, setData] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = () => {
  //     fetch("https://tender-mclean-00a2bd.netlify.app/web/movies.json")
  //       .then((response) => {
  //         // setData(response);
  //         console.log({ response });
  //       })
  //       .catch((error) => {
  //         console.log({ error });
  //         setError(error.message);
  //       })
  //       .finally(() => setLoading(false));
  //   };

  //   fetchData();
  // }, []);

  return (
    <Flex w="100%" h="100vh" alignItems="center" justifyContent="center">
      <Box minW="90%" w="1000px" h="90%">
        <TableComponent data={data} />
      </Box>
    </Flex>
  );
}

export default App;
