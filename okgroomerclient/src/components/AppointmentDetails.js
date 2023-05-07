import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBookingById } from '../Modules/BookingManager'

export const AppointmentDetails = () => {

  const [appointment, setAppointment] = useState({})
  const { id } = useParams()

  useEffect(() => {
    getBookingById(id)
      .then((res) => {
        setAppointment(res)
      })
  }, [])

  const ReturnTime = (datetoBeConverted) => {
    const date = new Date(datetoBeConverted);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate
  }

  const getTimeFromDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const options = {
      hour: 'numeric',
      minute: 'numeric'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getDateFromDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };


  const servicesBreakdown = (servicesArr) => {
    return servicesArr.map((service) => {
      return <div key={service.id}><u>{service.name}</u></div>
    })
  }

  if (Object.keys(appointment).length === 0) {
    return <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>;
  }

  return (
    <>
      <div className="dog-info">
        <h4>
          {appointment.dog.name}
        </h4>
        <div>
          weight: {appointment.dog.weight} lbs.
        </div>
        <div>
          Owner: {appointment.profile.firstName} {appointment.profile?.lastName}
        </div>
      </div>
      <div className='appointment-details'>
        Date: {getDateFromDateTime(appointment.dateStart)} from {getTimeFromDateTime(`${appointment.dateStart}+00:00`)}-{getTimeFromDateTime(`${appointment.dateEnd}+00:00`)}
        <div>
          Services: {servicesBreakdown(appointment.services)}
        </div>
      </div>
    </>
  )
}
