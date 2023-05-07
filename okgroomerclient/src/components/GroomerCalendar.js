import React, { useEffect, useState } from "react";
import Calendar from 'react-awesome-calendar'
import { me } from "../Modules/authManager";
import { bookingsByGroomer } from "../Modules/BookingManager";
import "../styles/AppointmentBooking.css"
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

export const GroomerCalendar = () => {
    const [appointments, setAppointments] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        me()
            .then((res) => setUserProfile(res))
    }, []);

    useEffect(() => {
        if (userProfile.id) {
            bookingsByGroomer(userProfile.id)
                .then((res) => {
                    setAppointments(res)
                });
        }
    }, [userProfile]);

    useEffect(() => {
        if (appointments.length > 0) {
            calendarEvents();
        }
    }, [appointments]);

    const calendarEvents = () => {
        const newEvents = [];
        for (const appointment of appointments) {
            const calendarEvent = {
                start: `${appointment.dateStart}+00:00`,
                end: `${appointment.dateEnd}+00:00`,
                title: `${appointment.dog.name} - ${appointment.services.length} services.`,
            };
            newEvents.push(calendarEvent);
        }
        setEvents(newEvents);
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            nowIndicator={true}
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay' // user can switch between the two
            }}
            slotMinTime="08:00:00" // Set the minimum time for the daily view to 8 AM
            slotMaxTime="18:00:00" // Set the maximum time for the daily view to 6 PM
            events={events}
            navLinks="true"
            expandRows="true"
        />
    );
};
