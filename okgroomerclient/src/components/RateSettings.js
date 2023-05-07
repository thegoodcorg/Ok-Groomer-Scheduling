import React, { useState, useEffect } from "react";
import { getAllServices } from "../Modules/servicesManager";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { me } from "../Modules/authManager";
import { getBookingRatesByGroomerId } from "../Modules/GroomerBookingRateManager";

export const RateSettings = () => {
    const [services, setServices] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [bookingRates, setBookingRates] = useState({})


    const { id } = useParams();

    useEffect(() => {
      getBookingRatesByGroomerId(currentUser.id)
      .then((res) => {
          setBookingRates(res)
      })
  },[currentUser])

    useEffect(() => {
        getAllServices()
        .then((res) => {
            setServices(res)
        })
    }, [])

    useEffect(() => {
        me().then((res) => {
          setCurrentUser(res);
        });
      }, []);

    return <>
        {services?.map(service => <Link to={`/service/${service.id}`}><div key={service.id}><h3>{service.name}</h3></div></Link>)}</>
}