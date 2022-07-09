import * as React from "react";
import { NextPage } from "next";
import { Footer } from "../components/Footer";
import { NavigationBar } from "../components/NavigationBar";

interface LayotuProps {
  children: React.ReactNode;
}

export const Layout: NextPage<LayotuProps> = ({ children }) => {
  return (
    <React.Fragment>
      <NavigationBar />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};
