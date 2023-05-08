import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { me } from "../Modules/authManager";
import { bookingsByGroomer } from "../Modules/BookingManager";

<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css"
/>

export const GroomerCalendar = () => {
    const [appointments, setAppointments] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        me().then((res) => setUserProfile(res));
    }, []);

    useEffect(() => {
        if (userProfile.id) {
            bookingsByGroomer(userProfile.id).then((res) => {
                setAppointments(res);
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
                id: appointment.id,
                start: `${appointment.dateStart}+00:00`,
                end: `${appointment.dateEnd}+00:00`,
                title: `${appointment.dog.name} - ${appointment.services.length} services.`,
            };
            newEvents.push(calendarEvent);
        }
        setEvents(newEvents);
    };

    const handleEventClick = (info) => {
        const eventId = info.event.id;
        // Create the URL with the event ID and navigate to it
        const url = `/appointmentdetails/${eventId}`;
        window.location.href = url;
      };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            nowIndicator={true}
            headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            events={events}
            navLinks={true}
            expandRows={true}
            eventClick={handleEventClick}
            editable={true}
        />
    );
};
