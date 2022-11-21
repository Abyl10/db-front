import React, { useState } from "react";
import InputMask from "react-input-mask";
import {
  Modal,
  Button,
  Group,
  InputBase,
  Text,
  Input,
  Select,
} from "@mantine/core";
import { getAllUsers, createUser } from "../../requests/users";
import { IUsers } from "../../ts/types";
import { countryData } from "../../consts/data";

interface IProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
  title: string;
  usersList: IUsers[];
  setUsersList: (val: IUsers[]) => void;
}

interface IFormValue {
  email: string;
  name: string;
  surname: string;
  salary: number;
  phone: string;
  cname: string;
}

const ModalUsers: React.FC<IProps> = ({
  opened,
  setOpened,
  title,
  usersList,
  setUsersList,
}) => {
  const [formValue, setFormValue] = useState<IFormValue>({
    email: "",
    name: "",
    surname: "",
    salary: 0,
    phone: "",
    cname: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null
  );

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
      formValue.email.length &&
      formValue.name.length &&
      formValue.surname.length &&
      formValue.salary >= 0 &&
      formValue.phone.length &&
      selectedCountryName
    ) {
      const params = {
        email: formValue.email,
        name: formValue.name,
        surname: formValue.surname,
        salary: formValue.salary,
        phone: formValue.phone,
        cname: selectedCountryName,
      };
      createUser(params).then((res) => {
        setSuccess(res.success);
        setMsg(res.message);
      });
      setTimeout(() => {
        setUsersList([]);
        getAllUsers().then((res) => setUsersList(res));
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
      name: "",
      surname: "",
      salary: 0,
      phone: "",
      cname: "",
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
          name={"name"}
          label="Name"
          placeholder={"Enter name"}
          value={formValue.name}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <InputBase
          name={"surname"}
          label="Surname"
          placeholder={"Enter surname"}
          value={formValue.surname}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <InputBase
          name={"salary"}
          label="Salary"
          placeholder={"Enter salary"}
          type={"number"}
          value={formValue.salary}
          onChange={handleInputChange}
          mt={"md"}
          mb={"xl"}
        />
        <Input.Wrapper label="Phone">
          <Input
            name={"phone"}
            onChange={handleInputChange}
            component={InputMask}
            mask="+7 (999) 999-99-99"
            placeholder="Your phone"
            alwaysShowMask={true}
          />
        </Input.Wrapper>
        <Select
          data={countryData}
          mt={"md"}
          mb={"xl"}
          label="Select Counrty Name"
          value={selectedCountryName}
          onChange={setSelectedCountryName}
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

export default ModalUsers;
