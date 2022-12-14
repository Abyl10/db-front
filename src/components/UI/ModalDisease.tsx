import React, { useState } from "react";
import { Modal, Button, Group, InputBase, Text } from "@mantine/core";

import { IDisease } from "../../ts/types";
import { createDisease, getAllDiseases } from "../../requests/disease";

interface IProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
  title: string;
  diseaseList: IDisease[];
  setDiseaseList: (val: IDisease[]) => void;
}

interface IFormValue {
  disease_code: string;
  pathogen: string;
  description: string;
  id: number;
}

const ModalDisease: React.FC<IProps> = ({
  opened,
  setOpened,
  title,
  diseaseList,
  setDiseaseList,
}) => {
  const [formValue, setFormValue] = useState<IFormValue>({
    disease_code: "",
    pathogen: "",
    description: "",
    id: 0,
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
      formValue.disease_code.length &&
      formValue.pathogen.length &&
      formValue.id > 0
    ) {
      setError(false);
      const params = {
        disease_code: formValue.disease_code,
        pathogen: formValue.pathogen,
        description: formValue.description,
        id: formValue.id,
      };
      createDisease(params).then((res) => {
        setSuccess(res.success);
        setMsg(res.message);
      });
      setTimeout(() => {
        setDiseaseList([]);
        getAllDiseases().then((res) => setDiseaseList(res));
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
      disease_code: "",
      pathogen: "",
      description: "",
      id: 0,
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={handleModalClose} title={title}>
        <InputBase
          name={"disease_code"}
          label="Disease Code"
          placeholder={"Enter disease code"}
          value={formValue.disease_code}
          onChange={handleInputChange}
        />
        <InputBase
          name={"pathogen"}
          label="Pathogen"
          placeholder={"Enter pathogen"}
          value={formValue.pathogen}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <InputBase
          name={"description"}
          label="Description"
          placeholder={"Enter disease description"}
          value={formValue.description}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <InputBase
          name={"id"}
          label="ID"
          type="number"
          placeholder={"Enter disease id"}
          value={formValue.id}
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

export default ModalDisease;
