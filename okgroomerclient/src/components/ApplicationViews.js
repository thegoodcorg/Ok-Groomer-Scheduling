import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { GroomerHomepage } from "./GroomerHomepage";
import { RateSettings } from "./RateSettings";
import { EditBookingService } from "./EditBookingService";
import { ServiceForm } from "./ServiceForm";
import { DogCreateForm } from "./DogCreateForm";
import { OwnerHomePage } from "./OwnerHomepage"
import { AppointmentBookingForm } from "./AppointmentBookingForm";
import { AppointmentHomePage } from "./AppointmentHomePage";
import { AppointmentDetails } from "./AppointmentDetails";
import { GroomerCalendar } from "./GroomerCalendar";

export default function ApplicationViews({ isLoggedIn, isGroomer }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              isLoggedIn ? (
                isGroomer ? (
                  <GroomerHomepage />
                ) : (
                  <OwnerHomePage />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="home" element={isGroomer ? <GroomerHomepage /> : <OwnerHomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="settings" element={<RateSettings />} />
          <Route path="/service/:id" element={<EditBookingService />} />
          <Route path="services" element={<ServiceForm />} />
          <Route path="dogcreateform" element={<DogCreateForm />} />
          <Route path="appointments" element={<AppointmentHomePage />} />
          <Route path="bookNow" element={<AppointmentBookingForm />} />
          <Route path="/appointmentdetails/:id" element={<AppointmentDetails/>} />
          <Route path="calendar" element={<GroomerCalendar />} />
        </Route>
      </Routes>
    </main>
  );
}
