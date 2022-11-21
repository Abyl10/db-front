import React, { useCallback, useEffect, useState } from "react";
import { Table, Button } from "@mantine/core";
import { deleteDisease, getAllDiseases } from "../../requests/disease";
import { IDisease } from "../../ts/types";
import "./Disease.css";
import ModalDisease from "../../components/UI/ModalDisease";

const Disease = () => {
  const [diseaseList, setDiseaseList] = useState<IDisease[]>([]);
  const [opened, setOpened] = useState<boolean>(false);

  const getDiseases = useCallback(() => {
    return getAllDiseases().then((res) => {
      setDiseaseList(res);
    });
  }, []);

  useEffect(() => {
    getDiseases();
  }, []);

  const handleCountryDelete = (elem: string) => {
    deleteDisease(elem).then((res) => console.log(res));
    setTimeout(() => {
      setDiseaseList([]);
      getAllDiseases().then((res) => {
        setDiseaseList(res);
      });
    }, 100);
  };

  const rows = diseaseList.map((element, index) => (
    <tr key={element.disease_code}>
      <td>{element.disease_code}</td>
      <td>{element.pathogen}</td>
      <td>{element.description}</td>
      <td>{element.id}</td>
      <td>
        <div className="buttons">
          <Button>Update</Button>
          <Button
            color={"red"}
            onClick={() => handleCountryDelete(element.disease_code)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="disease">
      <div className="header">
        <h1>Disease</h1>
        <Button
          color={"green"}
          onClick={() => {
            setOpened(true);
          }}
        >
          Add Disease
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Disease Code</th>
            <th>Pathogen</th>
            <th>Description</th>
            <th>ID</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <ModalDisease
        opened={opened}
        setOpened={setOpened}
        diseaseList={diseaseList}
        setDiseaseList={setDiseaseList}
        title={"Disease"}
      />
    </div>
  );
};

export default Disease;
