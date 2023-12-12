import React from "react";
import Nav from "./Nav";
import Provider from "./Provider";

export default function Layout({ children }) {
  return (
    <>
      {/* <Provider> */}
      <main className="app">
        <Nav />
        <div className="bg-[#020916]">{children}</div>
      </main>
      {/* </Provider> */}
    </>
  );
}
