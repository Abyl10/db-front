import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Loader } from "@mantine/core";

import {
  getAllPublicServants,
  deletePublicServant,
} from "../../requests/publicservant";
import { IPublicServant } from "../../ts/types";
import "./PublicServant.css";
import ModalPublicServant from "../../components/UI/ModalPublicServant";
import { getAllEmails } from "../../requests/users";

const PublicServant = () => {
  const [publicServantList, setPublicServantList] = useState<IPublicServant[]>(
    []
  );
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getDiseaseType = useCallback(() => {
    return getAllPublicServants().then((res) => {
      setPublicServantList(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getDiseaseType();
  }, []);

  const handlePublicServantDelete = (email: string) => {
    deletePublicServant(email).then((res) => console.log(res));
    setTimeout(() => {
      setPublicServantList([]);
      getAllPublicServants().then((res) => {
        setPublicServantList(res);
      });
    }, 100);
  };

  const rows = publicServantList.map((element, index) => (
    <tr key={element.email}>
      <td>{element.email}</td>
      <td>{element.department}</td>
      <td>
        <div className="buttons">
          <Button>Update</Button>
          <Button
            color={"red"}
            onClick={() => handlePublicServantDelete(element.email)}
          >
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
        <div className="diseasetype">
          <div className="header">
            <h1>Public Servant</h1>
            <Button
              color={"green"}
              onClick={() => {
                setOpened(true);
              }}
            >
              Add Public Servant
            </Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Department</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <ModalPublicServant
            opened={opened}
            setOpened={setOpened}
            title={"Add New Public Servant"}
            publicServantList={publicServantList}
            setPublicServantList={setPublicServantList}
          />
        </div>
      )}
    </div>
  );
};

export default PublicServant;
