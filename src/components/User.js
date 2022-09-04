import {
  Button,
  Heading,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const User = ({
  userList,
  userFilter,
  setUserFilter,
  dispatchUser,
  isMountedUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = () => {
    const newID = Number(userList[userList.length - 1].id) + 1;

    fetch(`http://localhost:3333/addUser/${newID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.textStatus}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMountedUser.current) {
          dispatchUser({ type: "ADD", payload: data });
        }
      })
      .catch((error) => {
        if (isMountedUser.current) {
          dispatchUser({ type: "FETCH_FAILURE", payload: error.message });
        }
      });
    setName("");
    setEmail("");
  };

  const deleteUser = () => {
    fetch(`http://localhost:3333/deleteUser/${userFilter}`, {
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
        if (isMountedUser.current) {
          dispatchUser({ type: "DELETE", payload: userFilter });
        }
      })
      .catch((error) => {
        if (isMountedUser.current) {
          dispatchUser({ type: "FETCH_FAILURE", payload: error.message });
        }
      });
  };

  return (
    <VStack spacing={6}>
      <Heading>user</Heading>
      <HStack>
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={() => addUser()}>add</Button>
      </HStack>
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
        <Button onClick={() => deleteUser()}>delete</Button>
      </HStack>
    </VStack>
  );
};
export default User;
