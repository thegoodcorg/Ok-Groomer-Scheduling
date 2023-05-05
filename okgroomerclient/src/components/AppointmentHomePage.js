import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyDogs } from '../Modules/DogManager'
import { me } from '../Modules/authManager'
import { bookingsByDog } from '../Modules/BookingManager'

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

    const bookingCardCreator = () => {
       console.log(myDogsBookings)
    }
    return (
        <>
        {bookingCardCreator()}
            <Link to="/bookNow">Book now!</Link>
        </>
    )
}
