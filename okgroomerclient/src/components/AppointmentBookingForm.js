import React, { useEffect } from 'react'
import { useState } from 'react'
import { AppointmentBooking } from './AppointmentBooking/AppointmentBooking';
import { AppointmentDogInfo } from './AppointmentBooking/AppointmentDog';
import { AppointmentGroomerInfo } from './AppointmentBooking/AppointmentGroomerInfo';
import { me } from '../Modules/authManager';
import "../styles/AppointmentBooking.css"
import { getMyDogs } from '../Modules/DogManager';
import { getAllServices } from '../Modules/servicesManager';

export const AppointmentBookingForm = () => {

  const [page, setPage] = useState(0);
  const [x, setX] = useState(0);
  const [formData, setFormData] = useState({
    dogId: null,
    dogName: "",
    dogWeight: null,
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
    selectedServices: []
  });
  const [myDogs, setMyDogs] = useState([])
  const [user, setUser] = useState({})
  const [services, setServices] = useState()

  const [selectedServices, setSelectedServices] = useState([])

  useEffect(() => {
    setSelectedServices(new Array(services?.length).fill(false))
  },[services])

  useEffect(() => {
    me()
    .then((res) => {
      setUser(res)
    })
  },[])

  useEffect(() => {
    if(user.id){
      getMyDogs(user.id)
      .then((res) => {
        setMyDogs(res)
      })
    }
  },[user])

  useEffect(() => {
    getAllServices()
    .then((res) => {
      setServices(res)
    })
  },[])


  const componentList = [
    <AppointmentBooking formData={formData}
    setFormData={setFormData}
    page={page}
    setPage={setPage}
    x={x}
    setX={setX}
    myDogs={myDogs} />,
    <AppointmentDogInfo formData={formData}
    setFormData={setFormData}
    page={page}
    setPage={setPage}
    x={x}
    setX={setX}
    services={services}
    selectedServices={selectedServices}
    setSelectedServices={setSelectedServices}
    />,
    <AppointmentGroomerInfo formData={formData}
    setFormData={setFormData}
    page={page}
    setPage={setPage}
    x={x}
    setX={setX}
    selectedServices={selectedServices}
    setSelectedServices={setSelectedServices}
    />,
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
