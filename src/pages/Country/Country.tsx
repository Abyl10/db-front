import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

import { getAllCountries } from "../../requests/country";
import { ICountry } from "../../ts/types";

const Country = () => {
  const [countryList, setCountryList] = useState<ICountry[]>([]);
  useEffect(() => {
    getAllCountries().then((res) => {
      setCountryList(res);
    });
  }, []);

  const rows = countryList.map((element, index) => (
    <tr key={element.cname}>
      <td>{index + 1}</td>
      <td>{element.cname}</td>
      <td>{element.population}</td>
      <td>Update</td>
      <td>Delete</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Country Name</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default Country;
