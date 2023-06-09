import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyDogs } from '../Modules/DogManager'
import { me } from '../Modules/authManager'
import { getMyBookings } from '../Modules/BookingManager'

export const AppointmentHomePage = () => {
    const [myDogs, setMyDogs] = useState([])
    const [user, setUser] = useState([])
    const [myDogsBookings, setMyDogsBookings] = useState([])

    useEffect(() => {
        me()
            .then((res) => {
                setUser(res)
            })
    }, [])

    useEffect(() => {
        if (user.id) {
            getMyDogs(user.id)
                .then((res) => {
                    setMyDogs(res)
                })
        }
    }, [user])

    useEffect(() => {
        if (myDogs.length > 0) {
            getMyBookings(user.id)
                .then((res) => {
                    setMyDogsBookings(res)
                })
        }
    }, [myDogs])

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
        return myDogsBookings.map((app) => {
            return <div key={app.id} className="card appointment-card">
                <div className="card-body">
                    <h5 className="card-subtitle mb-2 text-body-secondary">{ReturnTime(`${app.dateStart}+00:00`)}</h5>
                    <h6 className="card-title">{app.dog.name}</h6>
                    <p className="card-text">{serviceDetails(app)}</p>
                    <Link
                    to={`/appointmentdetails/${app.id}`} 
                    className="link-button details-button">More Details</Link>
                </div>
            </div>
        })
    }
    return (<>
        <div className="appointment-bar">
            <Link to="/bookNow" className='link-button'>Book now!</Link>
        </div>
        <div className="appointments-container">
            <div className="custom-header">
                Upcoming appointments
            </div>
            <div className='appointment-cards'>
                {appointmentCards()}
            </div>
        </div>
    </>
    )
}
