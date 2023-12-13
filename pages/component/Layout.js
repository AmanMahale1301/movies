import React from "react";
import Nav from "./Nav";
import Provider from "./Provider";

export default function Layout({ children }) {
  return (
    <>
      {/* <Provider> */}
      <main className="app min-h-screen flex flex-col">
        <Nav />
        <div className="flex-1 bg-[#020916]">{children}</div>
      </main>
      {/* </Provider> */}
    </>
  );
}
