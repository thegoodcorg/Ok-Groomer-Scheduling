import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllBookingRates } from "../../Modules/GroomerBookingRateManager";

export const AppointmentGroomerInfo = ({page, setPage, formData, setFormData, x, setX, selectedServices}) => {

  const [groomerBookingRates, setGroomerBookingRates] = useState([])

  useEffect(() => {
    getAllBookingRates()
    .then((res) => {
      setGroomerBookingRates(res)
    })
  },[])

  const calculateGroomerPricing = (groomerId) => {
   return groomerBookingRates.map(singleRate => {
      if(singleRate.doesGroomerOffer && groomerId == singleRate.groomerId) {
        if(formData.dogWeight < 29){
          return singleRate.smallDogPrice
        }
        if(formData.dogWeight > 60){
          return singleRate.largeDogPrice
        }
        else{return singleRate.mediumDogPrice}
      }
    })
  }



    return (
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
    );
  };
    
