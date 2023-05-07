import React, { useEffect, useState } from "react";
import Calendar from 'react-awesome-calendar'
import { me } from "../Modules/authManager";
import { bookingsByGroomer } from "../Modules/BookingManager";


export const GroomerCalendar = () => {

    const [appointments, setAppointments] = useState([])
    const [userProfile, setUserProfile] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() => {
        me()
            .then((res) => setUserProfile(res))
    }, [])

    useEffect(() => {
        if (userProfile.id) {
            bookingsByGroomer(userProfile.id)
                .then((res) => {
                    setAppointments(res)
                })
        }
    }, [userProfile])

    useEffect(() => {
        if (appointments.length > 0) {
            calendarEvents()
        }
    }, [appointments])

    const calendarEvents = () => {
        const newEvents = [];
        for (const appointment of appointments) {
            const calendarEvent = {
                color: "#fd3153",
                from: `${appointment.dateStart}+00:00`,
                to: `${appointment.dateEnd}+00:00`,
                title: `${appointment.dog.name} - ${appointment.services.length} services.`,
            };
            newEvents.push(calendarEvent);
        }
        setEvents(newEvents);
    };


    return (
        <div>
            <Calendar
                minTime={8}
                maxTime={1600}
                 events={events} />
        </div>
    )
}
