import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookingById } from '../Modules/BookingManager';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Popover, OverlayTrigger, Button, Modal } from 'react-bootstrap';
import { AppointmentScheduler } from './AppointmentBooking/AppointmentScheduler';
import DatePicker from 'react-date-picker';
import { updateBooking } from '../Modules/BookingManager';

export const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState({});
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false)
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({})

  useEffect(() => {
      let totalTime = 0
      appointment.services?.map((service) => {
        totalTime += service.timeToComplete
      })
      const copy = { ...appointment }
      copy.totalTime = totalTime
      setFormData(copy)
  }, [appointment])

  useEffect(() => {
    getBookingById(id).then((res) => {
      setAppointment(res);
    });
  }, []);

  useEffect(() => {
    if (selectedTime !== null) {
      setTimeOnDate()
    }
  }, [selectedTime])

  const availableTimes = [
    '08:00AM', '08:30AM', '09:00AM', '09:30AM', '10:00AM', '10:30AM',
    '11:00AM', '11:30AM', '12:00PM', '12:30PM', '01:00PM', '01:30PM',
    '02:00PM', '02:30PM', '03:00PM', '03:30PM', '04:00PM', '04:30PM',
    '05:00PM'
  ];

  const timeSlotBuilder = () => {
    return (
      <select value={selectedTime} onChange={handleTimeChange}>
        {availableTimes.map(timeSlot => (
          <option key={timeSlot} value={timeSlot}>
            {timeSlot}
          </option>
        ))}
      </select>
    );
  };

  const handleSaveClick = () => {
    const objToSend = {
      id: appointment.id,
      dateStart: formData.dateStart,
      dateEnd: formData.dateEnd
    }
    updateBooking(objToSend)
    .then(() => {
      getBookingById(id)
      .then(res => setAppointment(res))
      .then(handleCloseModal)
    })
  }

  const handleDateChange = (e) => {
    const copy = { ...formData }
    copy.dateAndTime = e
    setFormData(copy)
  }

  const convertHoursToTimeFormat = (hours, dateAndTime) => {
    const decimalHours = hours % 1; // Extract the decimal part of the hours
    const minutes = Math.round(decimalHours * 60); // Convert decimal part to minutes
    const formattedHours = Math.floor(hours); // Get the whole number part of the hours

    const formattedTime = new Date();
    formattedTime.setHours(formattedHours, minutes, 0); // Set hours and minutes to the Date object

    const updatedDateAndTime = new Date(dateAndTime);
    updatedDateAndTime.setHours(
      updatedDateAndTime.getHours() + formattedTime.getHours(),
      updatedDateAndTime.getMinutes() + formattedTime.getMinutes(),
      updatedDateAndTime.getSeconds() + formattedTime.getSeconds()
    );

    return updatedDateAndTime
  };

  const setTimeOnDate = () => {

    const timeParts = selectedTime.match(/(\d+):(\d+)(\w+)/); // match the time string using a regular expression
    let hours = parseInt(timeParts[1]); // get the hours as an integer
    let minutes = parseInt(timeParts[2]); // get the minutes as an integer
    let isPM = /pm/i.test(timeParts[3]); // check if the time is PM or AM
    let newDate = new Date(formData.dateAndTime); // create a new Date object with the value from selectedDate

    if (isPM && hours !== 12) {
      hours += 12; // add 12 hours to the hours if it's a PM time and not already 12
    } else if (!isPM && hours === 12) {
      hours = 0; // set the hours to 0 if it's a 12AM time
    }

    newDate.setHours(hours); // set the hours on the new Date object
    newDate.setMinutes(minutes); // set the minutes on the new Date object

    // update the state with the new Date object

    const copy = { ...formData }
    copy.dateStart = newDate
    copy.dateEnd = convertHoursToTimeFormat(copy.totalTime, newDate)
    setFormData(copy)
  }

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value)
  }

  const ReturnTime = (datetoBeConverted) => {
    const date = new Date(datetoBeConverted);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getTimeFromDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getDateFromDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const servicesBreakdown = (servicesArr) => {
    return servicesArr.map((service) => {
      const popover = (
        <Popover id={service.id}>
          <Popover.Header>{service.name}</Popover.Header>
          <Popover.Body>{service.description}</Popover.Body>
        </Popover>
      );

      return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover} key={service.id}>
          <Button variant="secondary">{service.name}</Button>
        </OverlayTrigger>
      );
    });
  };

  if (Object.keys(appointment).length === 0) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="dog-info">
        <h4>
          {appointment.dog.name}
        </h4>
        <div>
          weight: {appointment.dog.weight} lbs.
        </div>
        <div>
          Owner: {appointment.profile.firstName} {appointment.profile?.lastName}
        </div>
      </div>
      <div
        className="appointment-details">
        Date: {getDateFromDateTime(appointment.dateStart)} from {getTimeFromDateTime(`${appointment.dateStart}+00:00`)}-{getTimeFromDateTime(`${appointment.dateEnd}+00:00`)}
        <Button variant="primary" onClick={handleOpenModal}>
          Edit Time
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reschedule?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {<DatePicker value={formData.dateAndTime} closeWidgets="false" isCalendarOpen="true" class="special-input" onChange={(e) => {
              handleDateChange(e)
            }} />}
            {timeSlotBuilder()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveClick}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          Services: {servicesBreakdown(appointment.services)}
        </div>
        <div>
          Total Due: ${appointment.price}
        </div>
      </div>
    </>
  );
};
