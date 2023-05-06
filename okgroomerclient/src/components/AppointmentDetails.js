import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBookingById } from '../Modules/BookingManager'

export const AppointmentDetails = () => {

    const [appointment, setAppointment] = useState({})
    const { id } = useParams()
   
    console.log(id)
    useEffect(() => {
        getBookingById(id)
        .then((res) => {
            setAppointment(res)
        })
    },[])

  return (
    <div>AppointmentDetails</div>
  )
}
