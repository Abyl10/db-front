import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Loader } from "@mantine/core";

import { getAllDoctors, deleteDoctor } from "../../requests/doctor";
import { IDoctor } from "../../ts/types";
import "./Doctor.css";
import ModalDoctor from "../../components/UI/ModalDoctor";

const Doctor = () => {
  const [doctorList, setDoctorList] = useState<IDoctor[]>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getDiseaseType = useCallback(() => {
    return getAllDoctors().then((res) => {
      setDoctorList(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getDiseaseType();
  }, []);

  const handleCountryDelete = (email: string) => {
    deleteDoctor(email).then((res) => console.log(res));
    setTimeout(() => {
      setDoctorList([]);
      getAllDoctors().then((res) => {
        setDoctorList(res);
      });
    }, 100);
  };

  const rows = doctorList.map((element, index) => (
    <tr key={element.email}>
      <td>{element.email}</td>
      <td>{element.degree}</td>
      <td>
        <div className="buttons">
          <Button>Update</Button>
          <Button
            color={"red"}
            onClick={() => handleCountryDelete(element.email)}
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
            <h1>Doctor</h1>
            <Button
              color={"green"}
              onClick={() => {
                setOpened(true);
              }}
            >
              Add Doctor
            </Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Degree</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <ModalDoctor
            opened={opened}
            setOpened={setOpened}
            title={"Add New Doctor"}
            doctorList={doctorList}
            setDoctorList={setDoctorList}
          />
        </div>
      )}
    </div>
  );
};

export default Doctor;
