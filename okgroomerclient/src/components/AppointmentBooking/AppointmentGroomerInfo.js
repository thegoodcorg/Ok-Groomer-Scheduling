import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllBookingRates } from "../../Modules/GroomerBookingRateManager";
import { getAllGroomers } from "../../Modules/authManager";

export const AppointmentGroomerInfo = ({ page, setPage, formData, setFormData, x, setX, selectedServices }) => {

  const [groomerBookingRates, setGroomerBookingRates] = useState([])
  const [groomers, setGroomers] = useState([])

  useEffect(() => {
    getAllBookingRates()
      .then((res) => {
        setGroomerBookingRates(res)
      })
  }, [])

  useEffect(() => {
    getAllGroomers()
      .then((res) => {
        const usersThatAreGroomers = res.filter(user => user.groomer)
        setGroomers(usersThatAreGroomers)
      })
  }, [])

  useEffect(() => {
    jobPricing()
  },[groomerBookingRates])

  const jobPricing = () => {
    const intersection = formData.selectedServices.filter(id => groomerBookingRates.includes(id));
    console.log(intersection)
  }

  const getSpecificPricing = () => {
    return groomers.map(groomer => {
      return <div>{groomer.firstName} can complete this job</div>
    })
  }


  return (
    <motion.div
      initial={{ x: x }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }}
    >
      {getSpecificPricing()}, {jobPricing()}


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
  );
};

