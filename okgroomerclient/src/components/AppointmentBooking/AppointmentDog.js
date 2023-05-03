import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "reactstrap";

export const AppointmentDogInfo = ({ page, setPage, formData, setFormData, x, setX, services, selectedServices, setSelectedServices}) => {

  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
        // Add the value to the array if the checkbox is checked
        setFormData({
            ...formData,
            selectedServices: [...formData.selectedServices, value],
        });
    } else {
        // Remove the value from the array if the checkbox is unchecked
        setFormData({
            ...formData,
            selectedServices: formData.selectedServices.filter((item) => item !== value),
        });
    }
};

  // useEffect(() => {
  //   setSelectedServices()
  // },[services])
  return (
    <motion.div
      initial={{ x: x }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }}
    >
      <h3>What are we doing to {formData.dogName}?</h3>
      <span>
      {services.map((service, i) => <><Input key={service.id} type="checkbox" value={service.id} onChange={(e) => {handleCheckboxChange(e)}}></Input><h5>{service.name}</h5></>)}
      </span>
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

