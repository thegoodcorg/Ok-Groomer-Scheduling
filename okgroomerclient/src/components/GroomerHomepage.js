import React, { useEffect, useState } from "react";
import { me } from "../Modules/authManager";
import { bookingsByGroomer } from "../Modules/BookingManager";

export const GroomerHomepage = () => {
    const [appointments, setAppointments] = useState([])
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        me()
            .then((res) => setUserProfile(res))
    })

    useEffect(() => {
        if (userProfile.id) {
            bookingsByGroomer(userProfile.id)
                .then((res) => {
                    setAppointments(res)
                })
        }
    }, [{ userProfile }])

    const appointmentCard = () => {
        return appointments.map((app) => {
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

    const serviceDetails2 = () => {
       return app.services.map(service => <li>{service.name}</li>)
    }

    const serviceDetails = () => {
        let htmlString = "In for "
        for (const service of app.services) {
            htmlString += `${service.name} `
        }
        return htmlString
    }

            return <div key={app.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">{app.dog.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{ReturnTime(app.date)}</h6>
                    <p className="card-text"><ul>{serviceDetails2()}</ul></p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        })
    }

    return <div>Hello there{appointmentCard()}</div>
}