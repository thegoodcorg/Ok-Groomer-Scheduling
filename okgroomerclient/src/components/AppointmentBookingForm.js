import React, { useEffect } from 'react'
import { useState } from 'react'
import { AppointmentBooking } from './AppointmentBooking/AppointmentBooking';
import { AppointmentDogInfo } from './AppointmentBooking/AppointmentDog';
import { AppointmentGroomerInfo } from './AppointmentBooking/AppointmentGroomerInfo';
import { me } from '../Modules/authManager';
import "../styles/AppointmentBooking.css"
import { getMyDogs } from '../Modules/DogManager';
import { getAllServices } from '../Modules/servicesManager';
import { AppointmentScheduler } from './AppointmentBooking/AppointmentScheduler';

export const AppointmentBookingForm = () => {

  const [page, setPage] = useState(0);
  const [x, setX] = useState(0);

  const [myDogs, setMyDogs] = useState([])
  const [user, setUser] = useState([])
  const [services, setServices] = useState([])

  const [formData, setFormData] = useState({
    ownerId: user.id,
    dogId: 0,
    dogName: "",
    dogWeight: null,
    selectedServices: [],
    serviceDetails: [],
    groomerId: 0,
    dateAndTime: null
  });

  useEffect(() => {
    detailsView(formData)

  }, [formData])

  useEffect(() => {
    let copy = { ...formData }
    copy.ownerId = user.id
    setFormData(copy)
  }, [user])

  useEffect(() => {
    me()
      .then((res) => {
        setUser(res)
      })
  }, [])

  useEffect(() => {
    if (user.id) {
      getMyDogs(user.id)
        .then((res) => {
          setMyDogs(res)
        })
    }
  }, [user])

  useEffect(() => {
    getAllServices()
      .then((res) => {
        setServices(res)
      })
  }, [])

  const detailsBuilder = () => {
    const listItems = [<li className="list-items">
      <div className="service-div"><u>Service</u></div>
      <div className="service-price-div"><u>Price</u></div>
      <div className="price-div"><u>Time</u></div>
    </li>];

    for (const detail of formData.serviceDetails) {
      listItems.push(
        <li className="list-items">
          <div className="service-div">{detail.objName}</div>
          <div className="service-price-div">${detail.objPrice}</div>
          <div className="price-div">{detail.objTimeToComplete === 1 ? `${detail.objTimeToComplete} hour` : `${detail.objTimeToComplete} hours`}</div>
        </li>
      );
    }
    if (formData.totalPrice > 0) {
      listItems.push(
        <li>Total: ${formData.totalPrice}</li>
      )
    }
    return listItems;
  }


  const detailsView = (formData) => {
    return (
      <>
        <div>
          <u>Dog</u><br /> {formData.dogName}
        </div>
        <div className='appointment-details'>
          <u>Details</u>
          <ul>
            {detailsBuilder()}
          </ul>
        </div>
      </>
    );
  };


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
    />,
    <AppointmentGroomerInfo formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
    />,
    <AppointmentScheduler formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
    />
  ];

  return (
    <div className="App">
      <div className="progress-bar">
        <div style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : "100%" }}></div>
      </div>
      <div className='bookingSelections'>
        {detailsView(formData)}
      </div>
      <div>{componentList[page]}
      </div>
    </div>
  );
}