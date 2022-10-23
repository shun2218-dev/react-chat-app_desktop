import React, { Suspense } from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Router from "@/routes/router";
import { RecoilRoot } from "recoil";
import Header from "./components/header";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
