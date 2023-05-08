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
    if(selectedTime !== null){
      setTimeOnDate()
    }
  },[selectedTime])

  const handleDateChange = (e) => {
    const copy = {...formData}
    copy.dateAndTime = e
    setFormData(copy)
  }

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value)
  }

  const convertHoursToTimeFormat = (hours, dateAndTime) => {
    const decimalHours = hours % 1; // Extract the decimal part of the hours
    const minutes = Math.round(decimalHours * 60); // Convert decimal part to minutes
    const formattedHours = Math.floor(hours); // Get the whole number part of the hours
  
    const formattedTime = new Date();
    formattedTime.setHours(formattedHours, minutes, 0); // Set hours and minutes to the Date object
  
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
  if(formData.dogId != 0 &&
    formData.groomerId != 0 &&
    formData.dateAndTime != null &&
    formData.totalPrice != null){
     
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
      .then(navigate('/'))
    }
}
  const setTimeOnDate = () => {

    const timeParts = selectedTime.match(/(\d+):(\d+)(\w+)/); // match the time string using a regular expression
    let hours = parseInt(timeParts[1]); // get the hours as an integer
    let minutes = parseInt(timeParts[2]); // get the minutes as an integer
    let isPM = /pm/i.test(timeParts[3]); // check if the time is PM or AM
    let newDate = new Date(formData.dateAndTime); // create a new Date object with the value from selectedDate
    
    if (isPM && hours !== 12) {
      hours += 12; // add 12 hours to the hours if it's a PM time and not already 12
    } else if (!isPM && hours === 12) {
      hours = 0; // set the hours to 0 if it's a 12AM time
    }
    
    newDate.setHours(hours); // set the hours on the new Date object
    newDate.setMinutes(minutes); // set the minutes on the new Date object
    
    // update the state with the new Date object
    
    const copy = {...formData}
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
  <p>Select a date and time</p>
    <div className='calendar'>
      <DatePicker value={formData.dateAndTime} closeWidgets="false" isCalendarOpen="true" class="special-input" onChange={(e) => {
       handleDateChange(e)
      }} />
      {timeSlotBuilder()}
    </div>
    <motion.div
      initial={{ x: x }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }}
    >

      <button onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
      <br />
      <button
        onClick={() => {
          setPage(page - 1);
          setX(-1000);
        }}>
        Previous
      </button>
    </motion.div>
  </>
  )
}
