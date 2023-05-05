import React, { useState } from 'react'
import { motion } from "framer-motion";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


export const AppointmentScheduler = ({ page, setPage, formData, setFormData, x, setX, services, selectedServices, setSelectedServices }) => {

  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('');

  const availableTimes = [
    '08:00AM', '08:30AM', '09:00AM', '09:30AM', '10:00AM', '10:30AM',
    '11:00AM', '11:30AM', '12:00PM', '12:30PM', '01:00PM', '01:30PM',
    '02:00PM', '02:30PM', '03:00PM', '03:30PM', '04:00PM', '04:30PM',
    '05:00PM'
  ];
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
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
    <div className='calendar'>
      <DatePicker value={selectedDate} closeWidgets="false" isCalendarOpen="true" class="special-input" onChange={(e) => {
        setSelectedDate(e)
      }} />
      {timeSlotBuilder()}
    </div>
    <motion.div
      initial={{ x: x }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }}
    >

      <button>
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
