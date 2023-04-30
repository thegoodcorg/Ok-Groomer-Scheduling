import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { GroomerHomepage } from "./GroomerHomepage";
import { RateSettings } from "./RateSettings";
import { EditService } from "./EditService";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <GroomerHomepage /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="settings" element={<RateSettings />} />
          <Route path="/service/:id" element={<EditService />} />
        </Route>
      </Routes>
    </main>
  );
}
