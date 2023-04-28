import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";


export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </main>
  );
}
