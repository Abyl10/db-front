import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal, Loader } from "@mantine/core";
import { getAllDiscover } from "../../requests/discover";
import { IDiscover } from "../../ts/types";
import "./Discover.css";
import ModalDiscover from "../../components/UI/ModalDiscover";

const Discover = () => {
  const [discoverList, setDiscoverList] = useState<IDiscover[]>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getDiscover = useCallback(() => {
    return getAllDiscover().then((res) => {
      setLoading(false);
      setDiscoverList(res);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getDiscover();
  }, []);

  // const handleCountryDelete = (elem: string) => {
  //   deleteDisease(elem).then((res) => console.log(res));
  //   setTimeout(() => {
  //     setDiscoverList([]);
  //     getAllDiseases().then((res) => {
  //       setDiscoverList(res);
  //     });
  //   }, 100);
  // };

  const rows = discoverList.map((element, index) => (
    <tr key={index}>
      <td>{element.disease_code}</td>
      <td>{element.cname}</td>
      <td>{element.first_enc_date.toString()}</td>
      <td>
        <div className="buttons">
          <Button>Update</Button>
          <Button
            color={"red"}
            onClick={() => {
              return;
            }}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      {loading ? (
        <div className="loader">
          <Loader color={"red"} size="lg" />
        </div>
      ) : (
        <div className="discover">
          <div className="header">
            <h1>Discover</h1>
            <Button
              color={"green"}
              onClick={() => {
                setOpened(true);
              }}
            >
              Add Discover
            </Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Disease Code</th>
                <th>Country name</th>
                <th>Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <ModalDiscover
            opened={opened}
            setOpened={setOpened}
            discoverList={discoverList}
            setDiscoverList={setDiscoverList}
            title={"Add New Discover"}
          />
        </div>
      )}
    </div>
  );
};

export default Discover;
