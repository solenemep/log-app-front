import { Alert, VStack } from "@chakra-ui/react";

import Nav from "./Nav";
import Footer from "./Footer";
import Users from "./User";
import Tasks from "./Task";
import { Fragment, useEffect, useReducer, useState } from "react";
import taskReducer from "../reducer/taskReducer";

import { useIsMounted } from "../hook/useIsMounted";
import userReducer from "../reducer/userReducer";

const initTask = {
  taskList: [],
  loadingTask: false,
  errorTask: "",
};

const initUser = {
  userList: [],
  loadingUser: false,
  errorUser: "",
};

const IznesApp = () => {
  const [userFilter, setUserFilter] = useState(1);

  const [stateTask, dispatchTask] = useReducer(taskReducer, initTask);
  const { taskList, loadingTask, errorTask } = stateTask;
  const isMountedTask = useIsMounted();

  const [stateUser, dispatchUser] = useReducer(userReducer, initUser);
  const { userList, loadingUser, errorUser } = stateUser;
  const isMountedUser = useIsMounted();

  useEffect(() => {
    dispatchTask({ type: "FETCH_INIT" });
    fetch("http://localhost:3333/task")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMountedTask.current) {
          dispatchTask({ type: "FETCH_SUCCESS", payload: data });
        }
      })
      .catch((error) => {
        if (isMountedTask.current) {
          dispatchTask({ type: "FETCH_FAILURE", payload: error.message });
        }
      });
  }, [isMountedTask]);

  useEffect(() => {
    dispatchUser({ type: "FETCH_INIT" });
    fetch("http://localhost:3333/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMountedUser.current) {
          dispatchUser({ type: "FETCH_SUCCESS", payload: data });
        }
      })
      .catch((error) => {
        if (isMountedUser.current) {
          dispatchUser({ type: "FETCH_FAILURE", payload: error.message });
        }
      });
  }, [isMountedUser]);

  const filteredTaskList = taskList.filter(
    (el) => el.user_id === Number(userFilter)
  );

  return (
    <Fragment>
      <Nav />

      <VStack minH={"100vh"} py={24} spacing={16}>
        {errorUser.length !== 0 && <Alert status="error">{errorUser}</Alert>}
        {loadingUser && <Alert status="info">Loading...</Alert>}
        {errorUser.length === 0 && !loadingUser && (
          <Users
            userList={userList}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
            dispatchUser={dispatchUser}
            isMountedUser={isMountedUser}
          />
        )}
        {errorTask.length !== 0 && <Alert status="error">{errorTask}</Alert>}
        {loadingTask && <Alert status="info">Loading...</Alert>}
        {errorTask.length === 0 && !loadingTask && (
          <Tasks
            userList={userList}
            taskList={filteredTaskList}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
            dispatchTask={dispatchTask}
            isMountedTask={isMountedTask}
          />
        )}
      </VStack>

      <Footer />
    </Fragment>
  );
};
export default IznesApp;
