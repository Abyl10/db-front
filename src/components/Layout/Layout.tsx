import React from "react";
import { AppShell, Header, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import NavbarCustom from "./Navbar";

interface IProps {
  children: React.ReactElement;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarCustom />}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Text>Abylay Kairatbek CSCI 341 bonus task</Text>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
      {children}
    </AppShell>
  );
};

export default Layout;
