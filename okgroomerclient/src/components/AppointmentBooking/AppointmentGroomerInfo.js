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


  const jobPricing = (groomerId) => {
    let totalPrice = null
    for (const id of formData.selectedServices) {
      for (const singleBooking of groomerBookingRates) {
        if(id == singleBooking.serviceId  && singleBooking.groomerId == groomerId){
        return totalPrice += priceByWeight(singleBooking)
        }
        
        
      }
    }
  }

  const priceByWeight = (singleBooking) => {
    let jobPrice = 0
    if(formData.dogWeight < 30){
      jobPrice += singleBooking.smallDogPrice
    }
    if(formData.dogWeight > 60){
      jobPrice += singleBooking.largeDogPrice
    }
    else {jobPrice += singleBooking.mediumDogPrice}
      console.log(jobPrice)
      return jobPrice
  }

  const getSpecificPricing = () => {
    return groomers.map(groomer => {
      return <div key={groomer.id}>{groomer.firstName} can complete this job for ${jobPricing(groomer.id)}</div>
    })
  }


  return (
    <motion.div
      initial={{ x: x }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }}
    >
      {getSpecificPricing()}


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

