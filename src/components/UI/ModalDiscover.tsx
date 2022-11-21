import React, { useEffect, useState } from "react";
import { Modal, Button, Group, InputBase, Text, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { IDiscover } from "../../ts/types";
import { createDiscover, getAllDiscover } from "../../requests/discover";
import { getDiseaseCodes } from "../../requests/disease";
import { getCountryNames } from "../../requests/country";
import dayjs from "dayjs";
import { countryData } from "../../consts/data";

interface IProps {
  opened: boolean;
  setOpened: (val: boolean) => void;
  title: string;
  discoverList: IDiscover[];
  setDiscoverList: (val: IDiscover[]) => void;
}

interface IFormValue {
  cname: string;
  disease_code: string;
  first_enc_date: Date;
}

const ModalDiscover: React.FC<IProps> = ({
  opened,
  setOpened,
  title,
  discoverList,
  setDiscoverList,
}) => {
  const [formValue, setFormValue] = useState<IFormValue>({
    cname: "",
    disease_code: "",
    first_enc_date: new Date(),
  });
  const [selectedDiseaseCode, setSelectedDiseaseCode] = useState<string | null>(
    null
  );
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null
  );

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [diseaseCodes, setDiseaseCodes] = useState<string[]>([]);
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    getDiseaseCodes().then((res) => {
      setDiseaseCodes(res);
    });
    getCountryNames().then((res) => {
      setCountryNames(res);
    });
  }, []);

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
      selectedCountryName?.length &&
      selectedDiseaseCode?.length &&
      dateString.length
    ) {
      setError(false);
      const params = {
        cname: selectedCountryName,
        disease_code: selectedDiseaseCode,
        first_enc_date: new Date(dateString),
      };
      createDiscover(params)
        .then((res) => {
          setSuccess(true);
          setMsg("Successfully added discover");
          getAllDiscover().then((res) => {
            setDiscoverList(res);
          });
        })
    } else {
      setError(true);
      setMsg("Please fill all fields");
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
      first_enc_date: new Date(),
    });
  };

  const diseaseData = [
    { value: "COVID-19", label: "COVID-19" },
    { value: "A049", label: "A049" },
    { value: "A1", label: "A1" },
    { value: "D1", label: "D1" },
    { value: "CV1", label: "CV1" },
    { value: "NS1", label: "NS1" },
    {
      value: "CV2",
      label: "CV2",
    },
    {
      value: "D2",
      label: "D2",
    },
    {
      value: "CD1",
      label: "CD1",
    },
  ];


  return (
    <>
      <Modal opened={opened} onClose={handleModalClose} title={title}>
        <Select
          data={diseaseData}
          mt={"md"}
          mb={"xl"}
          label="Select Disease Code"
          value={selectedDiseaseCode}
          onChange={setSelectedDiseaseCode}
        />
        <Select
          data={countryData}
          mt={"md"}
          mb={"xl"}
          label="Select Counrty Name"
          value={selectedCountryName}
          onChange={setSelectedCountryName}
        />
        <DatePicker
          value={date}
          onChange={() => {
            setDate(date);
            setDateString(dayjs(date).format("YYYY-MM-DD"));
          }}
          placeholder="Pick date"
          label="Event date"
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

export default ModalDiscover;
