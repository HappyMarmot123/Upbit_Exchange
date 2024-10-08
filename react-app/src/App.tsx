import React, { createContext, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./css/custom.css";
import "./css/dialog.css";
import "./css/scrollbar.css";
import "./css/ticker.css";
import "./css/common.css";
import { ContextProvider } from "./context/ContextProvider";
import store from "./store";
import { Provider } from "react-redux";

const Home = React.lazy(() => import("./pages/Home"));
const Test = React.lazy(() => import("./pages/Exchange"));

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ContextProvider>
          <Suspense fallback={<div>loading</div>}>
            <Routes>
              <Route path="*" element={<Navigate replace to="/" />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </ContextProvider>
      </Provider>
    </>
  );
}
