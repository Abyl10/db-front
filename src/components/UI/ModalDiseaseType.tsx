import React, { useState } from "react";
import { Modal, Button, Group, InputBase, Text } from "@mantine/core";
import {
  createDiseaseType,
  getAllDiseaseTypes,
} from "../../requests/diseasetype";
import { IDiseaseType } from "../../ts/types";

interface IProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
  title: string;
  diseaseTypeList: IDiseaseType[];
  setDiseaseTypeList: (val: IDiseaseType[]) => void;
}

interface IFormValue {
  id: number;
  description: string;
}

const ModalDiseaseType: React.FC<IProps> = ({
  opened,
  setOpened,
  title,
  diseaseTypeList,
  setDiseaseTypeList,
}) => {
  const [formValue, setFormValue] = useState<IFormValue>({
    id: 0,
    description: "",
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
    console.log(formValue.id, formValue.description);
    if (formValue.description.length && formValue.id > 0) {
      setError(false);
      const params = {
        id: formValue.id,
        description: formValue.description,
      };
      createDiseaseType(params).then((res) => {
        setSuccess(res.success);
        setMsg(res.message);
      });
      setTimeout(() => {
        setDiseaseTypeList([]);
        getAllDiseaseTypes().then((res) => setDiseaseTypeList(res));
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
      id: 0,
      description: "",
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={handleModalClose} title={title}>
        <InputBase
          name={"id"}
          label="ID"
          placeholder={"Enter diseasetype ID"}
          value={formValue.id}
          onChange={handleInputChange}
        />
        <InputBase
          name={"description"}
          label="Description"
          type="number"
          placeholder={"Enter diseasetype description"}
          value={formValue.description}
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
