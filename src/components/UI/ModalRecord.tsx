import React, { useState } from "react";
import { Modal, Button, Group, InputBase, Text } from "@mantine/core";
import { IRecord } from "../../ts/types";
import { createRecord, getAllRecords } from "../../requests/record";

interface IProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
  title: string;
  recordList: IRecord[];
  setRecordList: (val: IRecord[]) => void;
}

interface IFormValue {
  cname: string;
  disease_code: string;
  email: string;
  total_patients: number;
  total_deaths: number;
}

const ModalRecord: React.FC<IProps> = ({
  opened,
  setOpened,
  title,
  recordList,
  setRecordList,
}) => {
  const [formValue, setFormValue] = useState<IFormValue>({
    cname: "",
    disease_code: "",
    email: "",
    total_patients: 0,
    total_deaths: 0,
  });
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(false);
    setSuccess(false);
    setMsg("");
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    if (
      formValue.cname.length &&
      formValue.disease_code.length &&
      formValue.email.length &&
      formValue.total_deaths > 0 &&
      formValue.total_patients > 0
    ) {
      setError(false);
      const params = {
        cname: formValue.cname,
        disease_code: formValue.disease_code,
        email: formValue.email,
        total_patients: formValue.total_patients,
        total_deaths: formValue.total_deaths,
      };
      createRecord(params).then((res) => {
        setSuccess(res.success);
        setMsg(res.message);
      });
      setTimeout(() => {
        setRecordList([]);
        getAllRecords().then((res) => setRecordList(res));
      }, 100);
    } else {
      setError(true);
      setSuccess(false);
      setMsg("");
    }
  };

  const handleModalClose = () => {
    setOpened(false);
    setError(false);
    setSuccess(false);
    setMsg("");
    setFormValue({
      cname: "",
      disease_code: "",
      email: "",
      total_patients: 0,
      total_deaths: 0,
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={handleModalClose} title={title}>
        <InputBase
          name={"cname"}
          label="Country name"
          placeholder={"Enter country name"}
          value={formValue.cname}
          onChange={handleInputChange}
        />
        <InputBase
          name={"disease_code"}
          label="Disease code"
          placeholder={"Enter disease code"}
          value={formValue.disease_code}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <InputBase
          name={"email"}
          label="Email"
          placeholder={"Enter email"}
          value={formValue.email}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <InputBase
          name={"total_patients"}
          label="Total patients"
          placeholder={"Enter total patients"}
          value={formValue.total_patients}
          type={"number"}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <InputBase
          name={"total_deaths"}
          label="Total deaths"
          placeholder={"Enter total deaths"}
          value={formValue.total_deaths}
          type={"number"}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <Group position={"center"} sx={{ marginBottom: 15 }}>
          {error && <Text color={"red"}>Fill all inputs</Text>}
          {!error && success && msg.length && (
            <Text color={"green"}>{msg}</Text>
          )}
        </Group>
        <Group position={"center"}>
          <Button onClick={handleAddClick}>Add</Button>
        </Group>
      </Modal>
    </>
  );
};

export default ModalRecord;
