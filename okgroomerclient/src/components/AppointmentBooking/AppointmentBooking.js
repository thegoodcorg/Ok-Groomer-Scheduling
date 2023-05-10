import React from "react";
import { motion } from "framer-motion";

export const AppointmentBooking = ({ page, setPage, formData, setFormData, x, setX, myDogs }) => {

  const handleDogChange = (e) => {
    const selectedDog = myDogs.find((dog) => dog.id == e.target.value);
    setFormData({
      ...formData,
      dogId: parseInt(e.target.value),
      dogName: selectedDog?.name,
      dogWeight: parseInt(selectedDog?.weight)
    })
  }

  const getDog = () => {
    return myDogs.map(dog => {
      return <li
      className="dog-selection-li">
        <input
          className="dog-selection"
          required="true"
          key={dog.id}
          type="radio"
          name="dogSelection"
          value={dog.id}
          onChange={(e) => {
            handleDogChange(e)
          }}>
        </input>
        <span
          key={dog.id}>
          {dog.name}
        </span>
      </li>
    })
  }

  return (<motion.div
    className="appointment-creation"
    initial={{ x: x }}
    transition={{ duration: 0.5 }}
    animate={{ x: 0 }}
  ><h3>Who are we working with?</h3>
  <div className="my-dog-list">
    {getDog()}
  </div>
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
