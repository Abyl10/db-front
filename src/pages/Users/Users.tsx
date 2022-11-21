import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Loader } from "@mantine/core";
import { deleteUser, getAllUsers } from "../../requests/users";
import { IUsers } from "../../ts/types";
import "./Users.css";
import ModalUsers from "../../components/UI/ModalUsers";

const Users = () => {
  const [usersList, setUsersList] = useState<IUsers[]>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getDiseaseType = useCallback(() => {
    return getAllUsers().then((res) => {
      setUsersList(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getDiseaseType();
  }, []);

  const handleUserDelete = (mail: string) => {
    deleteUser(mail).then((res) => console.log(res));
    setTimeout(() => {
      setUsersList([]);
      getAllUsers().then((res) => {
        setUsersList(res);
      });
    }, 100);
  };

  const rows = usersList.map((element, index) => (
    <tr key={element.email}>
      <td>{element.email}</td>
      <td>{element.name}</td>
      <td>{element.surname}</td>
      <td>{element.salary}</td>
      <td>{element.phone}</td>
      <td>{element.cname}</td>
      <td>
        <div className="buttons">
          <Button>Update</Button>
          <Button color={"red"} onClick={() => handleUserDelete(element.email)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      {loading ? (
        <div className="loader">
          <Loader color={"red"} size="lg" />
        </div>
      ) : (
        <div className="users">
          <div className="header">
            <h1>Users</h1>
            <Button
              color={"green"}
              onClick={() => {
                setOpened(true);
              }}
            >
              Add Users
            </Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Salary</th>
                <th>Phone</th>
                <th>Country Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <ModalUsers
            opened={opened}
            setOpened={setOpened}
            title={"Add New Users"}
            usersList={usersList}
            setUsersList={setUsersList}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
