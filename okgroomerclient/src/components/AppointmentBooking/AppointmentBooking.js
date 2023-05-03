import React from "react";
import { motion } from "framer-motion";

export const AppointmentBooking = ({page, setPage, formData, setFormData, x, setX}) => {
    return ( <motion.div                            //updated the div tag
    initial={{ x: x }}
    transition={{ duration: 1 }}
    animate={{ x: 0 }}
  >
      <input
      type="text"
      placeholder="Full Name"
      value={formData.fullName} //setting the value of the form to the props value
      onChange={(e) =>
        setFormData({ ...formData, fullName: e.target.value })  //setting the formData to the value input of the textfield 
      }
    />
    <input
      type="text"
      placeholder="Username"
      value={formData.username}
      onChange={(e) =>
        setFormData({ ...formData, username: e.target.value }) 
      }
    />
    <input
      type="text"
      placeholder="Password"
      value={formData.password}
      onChange={(e) =>
        setFormData({ ...formData, password: e.target.value })
      }
    />
      <button
          onClick={() => {
            setPage(page + 1);
            setX(1000);
          }}>
          Next
        </button>
      </motion.div>
    );
  };
  