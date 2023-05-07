import React from "react";
import { motion } from "framer-motion";

export const AppointmentBooking = ({ page, setPage, formData, setFormData, x, setX, myDogs }) => {



  return (<motion.div
    initial={{ x: x }}
    transition={{ duration: 0.5 }}
    animate={{ x: 0 }}
  ><h3>Who are we working with?</h3>
    <select
      placeholder="Full Name"
      value={formData.dogId}
      onChange={(e) => {
        const selectedDog = myDogs.find((dog) => dog.id == e.target.value);
    setFormData({
      ...formData,
      dogId: parseInt(e.target.value),
      dogName: selectedDog?.name,
      dogWeight: parseInt(selectedDog?.weight)})}}>
      <option value={0} key={0}>Select your pet</option>
      {myDogs.map(dog => <option value={dog.id} key={dog.id}>{dog.name}</option>)}

    </select>
    <br />
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
