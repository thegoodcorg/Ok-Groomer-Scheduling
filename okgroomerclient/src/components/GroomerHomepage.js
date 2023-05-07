import React, { useEffect, useState } from "react";
import { me } from "../Modules/authManager";
import { bookingsByGroomer } from "../Modules/BookingManager";
import { Link } from "react-router-dom";

export const GroomerHomepage = () => {
    const [appointments, setAppointments] = useState([])
    const [userProfile, setUserProfile] = useState({})

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

    const ReturnTime = (datetoBeConverted) => {
        const date = new Date(datetoBeConverted);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate
    }

    const serviceDetails = (app) => {
        return `${app.services.length} services`
    }

    const appointmentCards = () => {
        return appointments.map((app) => {
            return <div key={app.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">{app.dog.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{ReturnTime(app.dateStart)}</h6>
                    <p className="card-text">{serviceDetails(app)}</p>
                    <Link to={`appointmentdetails/${app.id}`} className="card-link">MoreDetails</Link>
                    <Link className="card-link">Another link</Link>
                </div>
            </div>
        })
    }

    return <>
        <Link to="calendar">Calendar view</Link>
        <div>{appointmentCards()}</div>
    </>
}