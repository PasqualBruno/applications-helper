import React from "react";
import "./MainLayout.css";

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return <div className="layout-wrapper">{children}</div>;
};
