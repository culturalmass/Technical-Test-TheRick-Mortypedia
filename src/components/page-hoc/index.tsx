import React from "react";
import { Toaster } from "sonner";
import { NavBar } from "../navbar";
import { Footer } from "../footer";

export const PageHOC = (Component: React.FC) => () => {
  return (
    <>
      <div className="min-h-screen flex flex-col relative justify-center">
        <div className="flex flex-1 justify-between flex-col">
          <Toaster theme="light" position="bottom-right" />
          <NavBar />
          <div className="flex-1 flex justify-center mt-2 flex-col">
            <Component />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
