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
          className="radio-margin"
          required="true"
          key={dog.id}
          type="radio"
          name="dogSelection"
          value={dog.id}
          onChange={(e) => {
            handleDogChange(e)
          }}>
        </input>
        <h5
          key={dog.id}>
          {dog.name}
        </h5>
      </li>
    })
  }

  return (<motion.div
    className="appointment-creation"
    initial={{ x: x }}
    transition={{ duration: 0.5 }}
    animate={{ x: 0 }}
  ><h3 className="header-padding-top">Who are we working with?</h3>
    <div className="my-dog-list">
      {getDog()}
    </div>
    <div className="previous-next-button-container">
      <button
      className="details-button"
        onClick={() => {
          setPage(page + 1);
          setX(1000);
        }}>
        Next
      </button>
    </div>
  </motion.div>
  );
};
