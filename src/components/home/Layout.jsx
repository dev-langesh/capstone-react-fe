import React from "react";
import App from "../../App";
import AppBar from "./AppBar";
import Info from "./Info";

export default function Layout({ children }) {
  return (
    <>
      <Info />
      <AppBar />

      <main>{children}</main>
    </>
  );
}
