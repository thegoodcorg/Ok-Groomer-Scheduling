import React from 'react'
import { useState } from 'react'
import { AppointmentBooking } from './AppointmentBooking/AppointmentBooking';
import { AppointmentDogInfo } from './AppointmentBooking/AppointmentDog';
import { AppointmentGroomerInfo } from './AppointmentBooking/AppointmentGroomerInfo';
import "../styles/AppointmentBooking.css"

export const AppointmentBookingForm = () => {

  const [page, setPage] = useState(0);
  const [x, setX] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    nickname: "",
    email: "",
    address: "",
    nationality: "",
    zipcode: "",
    highestQualification: "", 
    occupation: "",
    about: "",
  });

  const componentList = [
    <AppointmentBooking formData={formData}
    setFormData={setFormData}
    page={page}
    setPage={setPage}
    x={x}
    setX={setX} />,
    <AppointmentDogInfo formData={formData}
    setFormData={setFormData}
    page={page}
    setPage={setPage}
    x={x}
    setX={setX}/>,
    <AppointmentGroomerInfo formData={formData}
    setFormData={setFormData}
    page={page}
    setPage={setPage}
    x={x}
    setX={setX}/>,
  ];

  return (
    <div className="App">
    <div className="progress-bar">
      <div style={{width: page === 0? "33%": page === 1? "66%": page === 2? "100%" : "100%"}}></div>
    </div>  
    <div>{componentList[page]}</div>
  </div>
);
}
