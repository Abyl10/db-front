import React, { useCallback, useEffect, useState } from "react";
import { Table, Button } from "@mantine/core";

import {
  deleteDiseaseType,
  getAllDiseaseTypes,
} from "../../requests/diseasetype";
import { IDiseaseType } from "../../ts/types";
import "./DiseaseType.css";
import ModalDiseaseType from "../../components/UI/ModalDiseaseType";

const DiseaseType = () => {
  const [diseaseTypeList, setDiseaseTypeList] = useState<IDiseaseType[]>([]);
  const [opened, setOpened] = useState<boolean>(false);

  const getDiseaseType = useCallback(() => {
    return getAllDiseaseTypes().then((res) => {
      setDiseaseTypeList(res);
    });
  }, []);

  useEffect(() => {
    getDiseaseType();
  }, []);

  const handleCountryDelete = (id: number) => {
    deleteDiseaseType(id).then((res) => console.log(res));
    setTimeout(() => {
      setDiseaseTypeList([]);
      getAllDiseaseTypes().then((res) => {
        setDiseaseTypeList(res);
      });
    }, 100);
  };

  const rows = diseaseTypeList.map((element, index) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.description}</td>
      <td>
        <div className="buttons">
          <Button>Update</Button>
          <Button color={"red"} onClick={() => handleCountryDelete(element.id)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="diseasetype">
      <div className="header">
        <h1>Disease Type</h1>
        <Button
          color={"green"}
          onClick={() => {
            setOpened(true);
          }}
        >
          Add Disease Type
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <ModalDiseaseType
        opened={opened}
        setOpened={setOpened}
        title={"Add New Disease Type"}
        diseaseTypeList={diseaseTypeList}
        setDiseaseTypeList={setDiseaseTypeList}
      />
    </div>
  );
};

export default DiseaseType;
