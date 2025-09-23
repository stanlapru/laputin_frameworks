import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import DefectCreate from "./pages/DefectCreate";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/login" replace />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/defects"
          element={
            <RequireAuth roles={["manager", "engineer", "observer"]}>
              <DefectsList />
            </RequireAuth>
          }
        /> */}
        <Route
          path="/defects/create"
          element={
            <RequireAuth roles={["manager", "engineer"]}>
              <DefectCreate />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
