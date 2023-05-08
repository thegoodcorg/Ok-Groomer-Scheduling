import React, { useState, useEffect } from "react";
import { getAllServices } from "../Modules/servicesManager";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { me } from "../Modules/authManager";
import { getBookingRatesByGroomerId, updateDoesOffer } from "../Modules/GroomerBookingRateManager";
import { setOrUpdateRate } from "../Modules/GroomerBookingRateManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

export const RateSettings = () => {
  const [services, setServices] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [bookingRates, setBookingRates] = useState(null)


  const { id } = useParams();

  useEffect(() => {
    if (currentUser.id > 0) {
      getBookingRatesByGroomerId(currentUser.id)
        .then((res) => {
          setBookingRates(res)
        })
    }
  }, [currentUser])

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

  const findMatchingBookingRate = () => {
    return services?.map((service) => {

    })
  }

  const cardBuilder = () => {
    return services?.map(service =>
      <div key={service.id} className="card">
        <Link
          to={`/service/${service.id}`
          }>
          <h5 className="card-header">{service.name}</h5>
        </Link>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">{service.description}</p>
          {
            bookingRates?.map(singleRate => {
              if (singleRate.serviceId === service.id && singleRate.doesGroomerOffer) {
                return <div className="card-body"
                  key={singleRate.id}
                >
                <div className="card-title">
                small: ${singleRate.smallDogPrice} / med: ${singleRate.mediumDogPrice} / large: ${singleRate.largeDogPrice}
                </div>
                <FontAwesomeIcon icon={faSquareCheck} size="xl" style={{color: "#24943a"}} />               
                   You are Offering this service.
                </div>
              }
            })
          }
        </div>
      </div>
    )
  }

  return <>
    {cardBuilder(services)}
  </>
}