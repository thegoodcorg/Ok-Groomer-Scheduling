import React from "react";
import { motion } from "framer-motion";
import { Input } from "reactstrap";

export const AppointmentDogInfo = ({ page, setPage, formData, setFormData, x, setX, services, selectedServices, setSelectedServices }) => {

  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, value],
      });
    } else {
      setFormData({
        ...formData,
        selectedServices: formData.selectedServices.filter((item) => item !== value),
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: x }}
        transition={{ duration: 0.5 }}
        animate={{ x: 0 }}
      >
        <h3 className="header-padding-top">What are we doing for {formData.dogName}?</h3>
        <span className="service-selections-container">
          {services.map((service) =>
            <>
              <div className="service-selections">
                <Input
                  key={service.id}
                  checked={formData.selectedServices.includes(service.id)}
                  type="checkbox"
                  value={service.id}
                  onChange={(e) => { handleCheckboxChange(e) }}>
                </Input>
              </div>
              <h5>{service.name}</h5>
            </>)}
        </span>
        <div className="previous-next-button-container">
          <button
            className="details-button"
            onClick={() => {
              setPage(page + 1);
              setX(1000);
            }}>
            Next
          </button>
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
    </>);
};

