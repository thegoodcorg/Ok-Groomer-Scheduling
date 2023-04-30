import React, { useState, useEffect } from "react";
import { getAllServices } from "../Modules/servicesManager";
import { getServiceBookingRate } from "../Modules/GroomerBookingRate.Manager";
import { useParams } from "react-router-dom";

export const RateSettings = () => {
    const [services, setServices] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        getServiceBookingRate(id)
            .then((res) => setServices(res))
    }, [])
    
    return <><div>this is where you will set your rates</div>
        {services?.map(service => <div key={service.id}><h3>{service.name}</h3></div>)}
    </>
}