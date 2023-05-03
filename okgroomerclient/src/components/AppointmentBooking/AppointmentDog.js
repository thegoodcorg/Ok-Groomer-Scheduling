import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "reactstrap";

export const AppointmentDogInfo = ({ page, setPage, formData, setFormData, x, setX, services}) => {

  const [selectedServices, setSelectedServices] = useState()

  useEffect(() => {
    setSelectedServices(services)
  },[services])
  return (
    <motion.div
      initial={{ x: x }}
      transition={{ duration: 0.5 }}
      animate={{ x: 0 }}
    >
      <h3>What are we doing to {formData.dogName}?</h3>
      <span>
      {services.map((service) => <><Input type="checkbox" value={service.id} onChange={(e) => {
            const copy = { ...formData }
            copy.selectedServices = e.target.checked
            setFormData(copy)}}></Input><h5>{service.name}</h5></>)}
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

