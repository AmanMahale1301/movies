import React from "react";
import Nav from "./Nav";
import Provider from "./Provider";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }) {
  return (
    <>
      <Provider>
        <main className="app min-h-screen flex flex-col">
          <Toaster position="top-center" reverseOrder={false} />
          <Nav />
          <div className="flex-1 bg-[#020916]">{children}</div>
        </main>
      </Provider>
    </>
  );
}
