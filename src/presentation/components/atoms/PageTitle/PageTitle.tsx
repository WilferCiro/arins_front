// Nextjs and react
import React, { cloneElement } from "react";

// Mantine
import { Title } from "@mantine/core";

// Web3

// Custom
import style from "./style.module.css";

interface Props {
  title: string;
  subtitle?: string;
  icon?: React.ReactElement;
}

const PageTitle = ({ title, subtitle, icon }: Props) => {
  return (
    <div className={style.title}>
      <div className={style.icon}>
        {icon && <>{cloneElement(icon, { size: "45px" })}</>}
      </div>
      <div>
        <Title order={2}>{title}</Title>
        {subtitle && <Title order={4}>{subtitle}</Title>}
      </div>
    </div>
  );
};

export default PageTitle;
