import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainLink.css";

interface MainLinkProps {
  icon?: React.ReactNode;
  color?: string;
  label: string;
  path: string | undefined;
}

const MainLink = ({ icon, color, label, path }: MainLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2],
        },
      })}
    >
      <div
        className="mainLink"
        onClick={() => {
          path && navigate(path);
        }}
      >
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </div>
    </UnstyledButton>
  );
};

export default MainLink;
