import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllBookingRates } from "../../Modules/GroomerBookingRateManager";
import { GetGroomersBySelectedServices, getAllGroomers } from "../../Modules/authManager";

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
    let servicesToSend = formData.selectedServices
    GetGroomersBySelectedServices(servicesToSend)
      .then((res) => {
        const usersThatAreGroomers = res.filter(user => user.groomer)
        setGroomers(usersThatAreGroomers)
      })
  }, [])


  const jobPricing = (groomerId) => {
    let totalPrice = 0
    for (const id of formData.selectedServices) {
      for (const singleBooking of groomerBookingRates) {
        if (id == singleBooking.serviceId && singleBooking.groomerId == groomerId) {
          totalPrice += priceByWeight(singleBooking)
        }
      }
    }
    return totalPrice
  }

  const priceByWeight = (singleBooking) => {
    let jobPrice = 0
    if (formData.dogWeight < 30) {
      jobPrice += singleBooking.smallDogPrice
    }
    if (formData.dogWeight > 60) {
      jobPrice += singleBooking.largeDogPrice
    }
    else { jobPrice += singleBooking.mediumDogPrice }
    return jobPrice
  }

  const jobPricingDetails = (stateObj) => {
    let arrToSend = []
    let totalPrice = 0
    for (const id of formData.selectedServices) {
      for (const singleBooking of groomerBookingRates) {
        if (id == singleBooking.serviceId && singleBooking.groomerId == stateObj.groomerId) {
          let objToArray = {
            "objId": singleBooking.id,
            "objName": singleBooking.service.name,
             "objPrice": priceByWeight(singleBooking)
          }
          arrToSend.push(objToArray)
          totalPrice += priceByWeight(singleBooking)
        }
      }
    }

    // htmlString += `Total: $${totalPrice}`
    stateObj.serviceDetails = arrToSend
    stateObj.totalPrice = totalPrice
    setFormData(stateObj)
  }

  const handleGroomerSelection = (e) => {
    const copy = {...formData}
    copy.groomerId = parseInt(e.target.value)
    jobPricingDetails(copy)
  }

const getSpecificPricing = () => {
    return groomers.map(groomer => {
      return <><input type="radio" name="groomerSelection" value={groomer.id} onChange={(e) => {handleGroomerSelection(e) }}></input><span key={groomer.id}>{groomer.firstName} can do this for ${jobPricing(groomer.id)}</span></>
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
          setPage(page + 1);
          setX(1000);
        }}>
        Next
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

