import React, { useState } from "react";
import { Modal, Button, Group, InputBase, Text } from "@mantine/core";
import { createCountry, getAllCountries } from "../../requests/country";
import { ICountry } from "../../ts/types";

interface IProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
  title: string;
  countryList: ICountry[];
  setCountryList: (val: ICountry[]) => void;
}

interface IFormValue {
  cname: string;
  population: number;
}

const ModalCountry: React.FC<IProps> = ({
  opened,
  setOpened,
  title,
  countryList,
  setCountryList,
}) => {
  const [formValue, setFormValue] = useState<IFormValue>({
    cname: "",
    population: 0,
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
    console.log(formValue.cname, formValue.population);
    if (formValue.cname.length && formValue.population > 0) {
      setError(false);
      const params = {
        cname: formValue.cname,
        population: formValue.population,
      };
      createCountry(params).then((res) => {
        setSuccess(res.success);
        setMsg(res.message);
      });
      setTimeout(() => {
        setCountryList([]);
        getAllCountries().then((res) => setCountryList(res));
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
      population: 0,
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={handleModalClose} title={title}>
        <InputBase
          name={"cname"}
          label="Country"
          placeholder={"Enter country name"}
          value={formValue.cname}
          onChange={handleInputChange}
        />
        <InputBase
          name={"population"}
          label="Population"
          type="number"
          placeholder={"Enter country population"}
          value={formValue.population}
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

export default ModalCountry;
