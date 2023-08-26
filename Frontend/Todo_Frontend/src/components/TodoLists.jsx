import React from "react";
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
} from "@chakra-ui/react";

function TodoLists({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) {
  return (
    <Tbody>
      <Tr>
        <Td textDecoration={isCompleted ? "line-through" : "none"}>{title}</Td>
        <Td textDecoration={isCompleted ? "line-through" : "none"}>
          {description}
        </Td>
        <Td>
          {" "}
          <input
            padding="1rem"
            type="checkbox"
            checked={isCompleted}
            onChange={() => updateHandler(id)}
          />
        </Td>
        <Td>
          {" "}
          <button onClick={() => deleteHandler(id)} >
            Delete
          </button>
        </Td>
      </Tr>
    </Tbody>
  );
}

export default TodoLists;
