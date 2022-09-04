import {
  Button,
  Heading,
  HStack,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const Task = ({
  userList,
  taskList,
  userFilter,
  setUserFilter,
  dispatchTask,
  isMountedTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    const newID = Number(taskList[taskList.length - 1].id) + 1;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(today.getDay());
    console.log(today.getMonth());
    console.log(today.getFullYear());

    fetch(`http://localhost:3333/addTask/${newID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userFilter,
        title: title,
        description: description,
        creation_date: today,
        status: "to do",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.textStatus}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMountedTask.current) {
          dispatchTask({ type: "ADD", payload: data });
        }
      })
      .catch((error) => {
        if (isMountedTask.current) {
          dispatchTask({ type: "FETCH_FAILURE", payload: error.message });
        }
      });
    setTitle("");
    setDescription("");
  };

  const deleteTask = (el) => {
    fetch(`http://localhost:3333/deleteTask/${Number(el.id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`something went wrong ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMountedTask.current) {
          dispatchTask({ type: "DELETE", payload: el });
        }
      })
      .catch((error) => {
        if (isMountedTask.current) {
          dispatchTask({ type: "FETCH_FAILURE", payload: error.message });
        }
      });
  };

  return (
    <VStack spacing={6}>
      <Heading>Task</Heading>
      <HStack>
        <Select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        >
          {userList.map((el) => {
            return (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            );
          })}
        </Select>
      </HStack>
      <HStack>
        <Input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={() => {
            addTask();
          }}
        >
          add
        </Button>
      </HStack>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>title</Th>
              <Th>description</Th>
              <Th>date</Th>
              <Th>status</Th>
              <Th>delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {taskList.map((el) => {
              return (
                <Tr key={el.id}>
                  <Td>{el.title}</Td>
                  <Td>{el.description}</Td>
                  <Td>{el.creation_date}</Td>
                  <Td>{el.status}</Td>
                  <Td>
                    <Button onClick={() => deleteTask(el)}>delete</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
export default Task;
