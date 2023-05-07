import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { me } from "../Modules/authManager";
import { bookingsByGroomer } from "../Modules/BookingManager";
import "../styles/AppointmentBooking.css";

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
                id: appointment.id, // Assign a unique ID to each event
                start: `${appointment.dateStart}+00:00`,
                end: `${appointment.dateEnd}+00:00`,
                title: `${appointment.dog.name} - ${appointment.services.length} services.`,
            };
            newEvents.push(calendarEvent);
        }
        setEvents(newEvents);
    };

    const handleEventDrop = (info) => {
        const { event } = info;

        // Find the event with the matching ID in the state
        const updatedEvents = events.map((evt) => {
            if (evt.id === event.id) {
                // Update the start and end times of the matched event
                return {
                    ...evt,
                    start: event.start,
                    end: event.end,
                };
            }
            return evt;
        });

        setEvents(updatedEvents);
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            editable={true}
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
            eventDrop={handleEventDrop} // Add the eventDrop callback
        />
    );
};
