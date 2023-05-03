import React from "react";
import { motion } from "framer-motion";

export const AppointmentGroomerInfo = ({page, setPage, formData, setFormData, x, setX}) => {
    return (
      <motion.div                            //updated the div tag
      initial={{ x: x }}
      transition={{ duration: 1 }}
      animate={{ x: 0 }}
    >
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nationality"
        value={formData.nationality}
        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
      />
      <input
        type="text"
        placeholder="Zipcode"
        value={formData.zipcode}
        onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
      />

  
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
          setX(1000);
        }}>
        Previous
      </button>
      </motion.div>
    );
  };
    
