import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./consts/routes";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
