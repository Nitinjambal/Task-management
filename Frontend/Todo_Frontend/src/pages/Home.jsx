import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverLink } from "../main";
import { toast } from "react-hot-toast";
import TodoLists from "../components/TodoLists";
import { AppContext } from "../components/AppContextProvider";
import { Form, Navigate } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
} from "@chakra-ui/react";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { setIsAuth, isAuth } = useContext(AppContext);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${serverLink}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${serverLink}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${serverLink}/task/addTask`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  const getAllTask = async () => {
    try {
      let { data } = await axios.get(`${serverLink}/task/getAllTask`, {
        withCredentials: true,
      });
      setUserTasks(data.userTasks);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllTask();
  }, [refresh]);

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">ADD TASK</button>
      </form>

      <div className="sub-Container" style={{ boder: "2px solid red" }}>
        <TableContainer>
          <Table variant="simple" width={"80%"} m={"auto"} mt={"2rem"}>
            <Thead bg="blue.600">
              <Tr>
                <Th color="white">Title</Th>
                <Th color="white">Description</Th>
                <Th color="white">status </Th>
                <Th color="white">deltete </Th>
              </Tr>
            </Thead>

            {userTasks?.map((task) => {
              return (
                <TodoLists
                  key={task._id}
                  title={task.title}
                  description={task.description}
                  isCompleted={task.isCompleted}
                  updateHandler={updateHandler}
                  deleteHandler={deleteHandler}
                  id={task._id}
                />
              );
            })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Home;
