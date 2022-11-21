import React, { useEffect, useState } from "react";
import { Modal, Button, Group, InputBase, Text, Select } from "@mantine/core";
import {
  createPublicServant,
  getAllPublicServants,
} from "../../requests/publicservant";
import { IPublicServant } from "../../ts/types";
import { stringify } from "querystring";
import { getAllEmails } from "../../requests/users";

interface IProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
  title: string;
  publicServantList: IPublicServant[];
  setPublicServantList: (val: IPublicServant[]) => void;
}

interface IFormValue {
  email: string;
  department: string;
}

interface IData {
  value: string;
  label: string;
}

interface IEmail {
  email: string;
}

const ModalPublicServant: React.FC<IProps> = ({
  opened,
  setOpened,
  title,
  publicServantList,
  setPublicServantList,
}) => {
  const [formValue, setFormValue] = useState<IFormValue>({
    email: "",
    department: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [emailData, setEmailData] = useState<IData[]>([]);
  const [usersEmail, setUsersEmail] = useState<IEmail[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [dummy, setDummy] = useState<boolean>(false);

  useEffect(() => {
    getAllEmails().then((res) => {
      setUsersEmail(res);
      setDummy(true);
    });
  }, []);

  useEffect(() => {
    usersEmail.map((item) => {
      setEmailData((prev) => [
        ...prev,
        {
          value: item.email,
          label: item.email,
        },
      ]);
    });
  }, [dummy]);

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
    if (selectedEmail?.length && formValue.department.length) {
      setError(false);
      const params = {
        email: selectedEmail,
        department: formValue.department,
      };
      createPublicServant(params).then((res) => {
        setSuccess(res.success);
        setMsg(res.message);
        setError(false);
      });
      setTimeout(() => {
        setPublicServantList([]);
        getAllPublicServants().then((res) => {
          setPublicServantList(res);
        });
      }, 1000);
    } else {
      setError(true);
      setMsg("Please fill all the fields");
    }
  };

  const handleModalClose = () => {
    setOpened(false);
    setError(false);
    setSuccess(false);
    setMsg("");
    setFormValue({
      email: "",
      department: "",
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={handleModalClose} title={title}>
        <Select
          data={emailData}
          mt={"md"}
          mb={"xl"}
          label="Select Counrty Name"
          value={selectedEmail}
          onChange={setSelectedEmail}
        />
        <InputBase
          name={"department"}
          label="Department"
          placeholder={"Enter department"}
          value={formValue.department}
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

export default ModalPublicServant;
