import React, { useState, useEffect } from "react";
import { getAllServices } from "../Modules/servicesManager";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { me } from "../Modules/authManager";

export const RateSettings = () => {
    const [services, setServices] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    const { id } = useParams();

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

    return <><div>this is where you will set your rates</div>
        {services?.map(service => <Link to={`/service/${service.id}`}><div key={service.id}><h3>{service.name}</h3></div></Link>)}</>
}