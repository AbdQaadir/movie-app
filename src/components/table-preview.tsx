import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

type TTablePreview = {
  columns: ColumnDef<any>[];
  children: React.ReactNode;
};

const TablePreview = ({ columns, children }: TTablePreview) => {
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
          <Tr>
            {columns?.map((column: any, index) => {
              return (
                <Th key={index} textTransform="capitalize">
                  {column.accessorKey}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody></Tbody>
      </Table>
      <Box w="full" h="100%">
        {children}
      </Box>
    </TableContainer>
  );
};

export default TablePreview;
