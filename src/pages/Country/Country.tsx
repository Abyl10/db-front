import React, { useCallback, useEffect, useState } from "react";
import { Table, Button } from "@mantine/core";

import { deleteCountry, getAllCountries } from "../../requests/country";
import { ICountry } from "../../ts/types";
import "./Country.css";
import ModalCountry from "../../components/UI/ModalCountry";

const Country = () => {
  const [countryList, setCountryList] = useState<ICountry[]>([]);
  const [opened, setOpened] = useState<boolean>(false);

  const getCounty = useCallback(() => {
    return getAllCountries().then((res) => {
      setCountryList(res);
    });
  }, []);

  useEffect(() => {
    getCounty();
  }, []);

  const handleCountryDelete = (elem: string) => {
    deleteCountry(elem).then((res) => console.log(res));
    setTimeout(() => {
      setCountryList([]);
      getAllCountries().then((res) => {
        setCountryList(res);
      });
    }, 100);
  };

  const rows = countryList.map((element, index) => (
    <tr key={element.cname}>
      <td>{index + 1}</td>
      <td>{element.cname}</td>
      <td>{element.population}</td>
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
    <div className="country">
      <div className="header">
        <h1>Country</h1>
        <Button
          color={"green"}
          onClick={() => {
            setOpened(true);
          }}
        >
          Add Country
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Country Name</th>
            <th>Population</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <ModalCountry
        opened={opened}
        setOpened={setOpened}
        title={"Add New Country"}
        countryList={countryList}
        setCountryList={setCountryList}
      />
    </div>
  );
};

export default Country;
