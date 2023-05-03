import React from "react";
import { motion } from "framer-motion";

export const AppointmentDogInfo = ({page, setPage, formData, setFormData, x, setX}) => {
    return (
        <motion.div                            //updated the div tag
        initial={{ x: x }}
        transition={{ duration: 1 }}
        animate={{ x: 0 }}
      >
        <input
          type="text"
          placeholder="Nickname"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
<button
        onClick={() => {
          setPage(page + 1);
          setX(-1000);
        }}>
        Next
      </button>
      <br/>
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
  
