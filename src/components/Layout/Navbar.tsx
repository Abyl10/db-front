import React from "react";
import { Navbar } from "@mantine/core";
import MainLink from "../UI/MainLink";
import {
  IconWorld,
  IconVirusSearch,
  IconVaccine,
  IconReportSearch,
  IconUsers,
  IconNurse,
  IconSchool,
  IconGraph,
  IconBriefcase,
} from "@tabler/icons";
import { options, tableNames } from "../../consts/data";

export const data = [
  {
    icon: <IconVirusSearch size={16} />,
    color: "red",
    label: tableNames[0],
    path: options.get(tableNames[0]),
  },
  {
    icon: <IconWorld size={16} />,
    color: "red",
    label: tableNames[1],
    path: options.get(tableNames[1]),
  },
  {
    icon: <IconVaccine size={16} />,
    color: "red",
    label: tableNames[2],
    path: options.get(tableNames[2]),
  },
  {
    icon: <IconReportSearch size={16} />,
    color: "red",
    label: tableNames[3],
    path: options.get(tableNames[3]),
  },
  {
    icon: <IconUsers size={16} />,
    color: "red",
    label: tableNames[4],
    path: options.get(tableNames[4]),
  },
  {
    icon: <IconBriefcase size={16} />,
    color: "red",
    label: tableNames[5],
    path: options.get(tableNames[5]),
  },
  {
    icon: <IconNurse size={16} />,
    color: "red",
    label: tableNames[6],
    path: options.get(tableNames[6]),
  },
  {
    icon: <IconSchool size={16} />,
    color: "red",
    label: tableNames[7],
    path: options.get(tableNames[7]),
  },
  {
    icon: <IconGraph size={16} />,
    color: "red",
    label: tableNames[8],
    path: options.get(tableNames[8]),
  },
];

const NavbarCustom = () => {
  return (
    <Navbar width={{ base: 300 }} height={500} p="xs">
      {data.map((element, index) => (
        <MainLink
          key={index}
          label={element.label}
          path={element.path}
          icon={element.icon}
          color={element.color}
        />
      ))}
    </Navbar>
  );
};

export default NavbarCustom;
