import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Loader } from "@mantine/core";
import { deleteRecord, getAllRecords } from "../../requests/record";
import { IRecord } from "../../ts/types";
import ModalRecord from "../../components/UI/ModalRecord";

const Record = () => {
  const [recordList, setRecordList] = useState<IRecord[]>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getDiseaseType = useCallback(() => {
    return getAllRecords().then((res) => {
      setLoading(false);
      setRecordList(res);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getDiseaseType();
  }, []);

  const handleCountryDelete = (cname: string) => {
    deleteRecord(cname).then((res) => console.log(res));
    setTimeout(() => {
      setRecordList([]);
      getAllRecords().then((res) => {
        setRecordList(res);
      });
    }, 100);
  };

  const rows = recordList.map((element, index) => (
    <tr key={element.email}>
      <td>{element.cname}</td>
      <td>{element.disease_code}</td>
      <td>{element.email}</td>
      <td>{element.total_patients}</td>
      <td>{element.total_deaths}</td>
      <td>
        <div className="buttons">
          <Button>Update</Button>
          <Button
            color={"red"}
            onClick={() => handleCountryDelete(element.cname)}
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
            <h1>Record</h1>
            <Button
              color={"green"}
              onClick={() => {
                setOpened(true);
              }}
            >
              Add Record
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
          <ModalRecord
            opened={opened}
            setOpened={setOpened}
            title={"Add New Record"}
            recordList={recordList}
            setRecordList={setRecordList}
          />
        </div>
      )}
    </div>
  );
};

export default Record;
