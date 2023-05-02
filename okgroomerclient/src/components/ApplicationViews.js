import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { GroomerHomepage } from "./GroomerHomepage";
import { RateSettings } from "./RateSettings";
import { EditBookingService } from "./EditBookingService";
import { ServiceForm } from "./ServiceForm";
import { DogCreateForm } from "./DogCreateForm";

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
          <Route path="/service/:id" element={<EditBookingService />} />
          <Route path="services" element={<ServiceForm />} />
          <Route path="dogcreateform" element={<DogCreateForm />} />
        </Route>
      </Routes>
    </main>
  );
}
