import React from 'react'
import { motion } from "framer-motion";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


export const AppointmentScheduler = ({ page, setPage, formData, setFormData, x, setX, services, selectedServices, setSelectedServices}) => {
  return (<>
        <div>
        <DateTimePicker />
        </div>
        <motion.div
          initial={{ x: x }}
          transition={{ duration: 0.5 }}
          animate={{ x: 0 }}
        >
        
          <button
            onClick={() => {
              alert("You've successfully submitted this form");
            }}>
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
