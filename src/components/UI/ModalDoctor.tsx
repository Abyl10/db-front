import React, { useState } from "react";
import { Modal, Button, Group, InputBase, Text } from "@mantine/core";
import { createDoctor, getAllDoctors } from "../../requests/doctor";
import { IDoctor } from "../../ts/types";

interface IProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
  title: string;
  doctorList: IDoctor[];
  setDoctorList: (val: IDoctor[]) => void;
}

interface IFormValue {
  email: string;
  degree: string;
}

const ModalDiseaseType: React.FC<IProps> = ({
  opened,
  setOpened,
  title,
  doctorList,
  setDoctorList,
}) => {
  const [formValue, setFormValue] = useState<IFormValue>({
    email: "",
    degree: "",
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
    if (formValue.email.length && formValue.degree.length) {
      setError(false);
      const params = {
        email: formValue.email,
        degree: formValue.degree,
      };
      createDoctor(params).then((res) => {
        setSuccess(res.success);
        setMsg(res.message);
      });
      setTimeout(() => {
        setDoctorList([]);
        getAllDoctors().then((res) => setDoctorList(res));
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
      email: "",
      degree: "",
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={handleModalClose} title={title}>
        <InputBase
          name={"email"}
          label="Email"
          placeholder={"Enter email"}
          value={formValue.email}
          onChange={handleInputChange}
        />
        <InputBase
          name={"degree"}
          label="Degree"
          placeholder={"Enter degree"}
          value={formValue.degree}
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

export default ModalDiseaseType;
