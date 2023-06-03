import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { postBooking } from '../../Modules/BookingManager';
import { useNavigate } from 'react-router-dom';


export const AppointmentScheduler = ({ page, setPage, formData, setFormData, x, setX, services, selectedServices, setSelectedServices }) => {


  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate()

  const availableTimes = [
    '08:00AM', '08:30AM', '09:00AM', '09:30AM', '10:00AM', '10:30AM',
    '11:00AM', '11:30AM', '12:00PM', '12:30PM', '01:00PM', '01:30PM',
    '02:00PM', '02:30PM', '03:00PM', '03:30PM', '04:00PM', '04:30PM',
    '05:00PM'
  ];
  const arrofSelectedBookings = []

  useEffect(() => {
    if (selectedTime !== null) {
      setTimeOnDate()
    }
  }, [selectedTime])

  const handleDateChange = (e) => {
    const copy = { ...formData }
    copy.dateAndTime = e
    setFormData(copy)
  }

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value)
  }

  const convertHoursToTimeFormat = (hours, dateAndTime) => {
    const decimalHours = hours % 1;
    const minutes = Math.round(decimalHours * 60);
    const formattedHours = Math.floor(hours);

    const formattedTime = new Date();
    formattedTime.setHours(formattedHours, minutes, 0);

    const updatedDateAndTime = new Date(dateAndTime);
    updatedDateAndTime.setHours(
      updatedDateAndTime.getHours() + formattedTime.getHours(),
      updatedDateAndTime.getMinutes() + formattedTime.getMinutes(),
      updatedDateAndTime.getSeconds() + formattedTime.getSeconds()
    );

    return updatedDateAndTime
  };

  const setBookingChoiceArr = () => {
    for (const service of formData.serviceDetails) {
      arrofSelectedBookings.push(service.objId)
    }
  }
  setBookingChoiceArr()

  const handleSubmit = (e) => {
    if (formData.dogId != 0 &&
      formData.groomerId != 0 &&
      formData.dateAndTime != null &&
      formData.totalPrice != null) {

      const objToSend = {
        ownerId: formData.ownerId,
        dogId: formData.dogId,
        groomerId: formData.groomerId,
        dateStart: formData.dateAndTime,
        dateEnd: formData.endDateAndTime,
        price: formData.totalPrice,
        groomerBookingRatesId: arrofSelectedBookings
      }
      postBooking(objToSend)
        .then(navigate('/appointments'))
    }
  }
  const setTimeOnDate = () => {

    const timeParts = selectedTime.match(/(\d+):(\d+)(\w+)/);
    let hours = parseInt(timeParts[1]);
    let minutes = parseInt(timeParts[2]);
    let isPM = /pm/i.test(timeParts[3]);
    let newDate = new Date(formData.dateAndTime);

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    const copy = { ...formData }
    copy.dateAndTime = newDate
    copy.endDateAndTime = convertHoursToTimeFormat(copy.totalTime, newDate)
    setFormData(copy)
  }

  const timeSlotBuilder = () => {
    return (
      <select value={selectedTime} onChange={handleTimeChange}>
        {availableTimes.map(timeSlot => (
          <option key={timeSlot} value={timeSlot}>
            {timeSlot}
          </option>
        ))}
      </select>
    );
  };

  return (<>
    <h3 className='header-padding-top'>Select a date and time</h3>
    <div className='calendar'>
      <DatePicker value={formData.dateAndTime} closeWidgets="false" isCalendarOpen="true" className="special-input" onChange={(e) => {
        handleDateChange(e)
      }} />
      {timeSlotBuilder()}
    </div>
    <motion.div
      initial={{ x: x }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }}
    >
      <div className="previous-next-button-container">
      <button
        className="details-button"
        onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
      <br />
      <button
        className="details-button"
        onClick={() => {
          setPage(page - 1);
          setX(-1000);
        }}>
        Previous
      </button>
      </div>
    </motion.div>
  </>
  )
}
