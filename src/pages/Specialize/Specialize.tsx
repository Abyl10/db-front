import React, { useCallback, useEffect, useState } from "react";
import { Table, Loader } from "@mantine/core";

import { getAllSpecializes } from "../../requests/specialize";
import { ISpecialize } from "../../ts/types";
import "./Specialize.css";

const Specialize = () => {
  const [specializeList, setSpecializeList] = useState<ISpecialize[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getSpecialize = useCallback(() => {
    return getAllSpecializes().then((res) => {
      setLoading(false);
      setSpecializeList(res);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getSpecialize();
  }, []);

  const rows = specializeList.map((element, index) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.email}</td>
    </tr>
  ));

  return (
    <div>
      {loading ? (
        <div className="loader"><Loader color={"red"} size="lg" /></div>
      ) : (
        <div className="specialize">
          <div className="header">
            <h1>Specialize</h1>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Specialize;
