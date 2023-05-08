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

  const cardBuilder = () => {
    return bookingRates?.map(singleRate =>
      <div key={singleRate.id} className="card">
        <Link
          to={`/service/${singleRate.serviceId}`
          }>
          <h5 className="card-header">{singleRate.service.name}</h5>
        </Link>
        <div className="card-body">
          <span className="card-title">
            {
              (singleRate.doesGroomerOffer ? (
                <div className="card-body"
                  key={singleRate.id}
                >
                  <div className="card-title">
                    small: ${singleRate.smallDogPrice} / med: ${singleRate.mediumDogPrice} / large: ${singleRate.largeDogPrice}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faSquareCheck} size="xl" style={{ color: "#24943a" }} />
                    You are Offering this service.
                  </div>
                </div>
              ) : null)
            }
          </span>
          <p className="card-text">{singleRate.service.description}</p>
        </div>
      </div>
    )
  }


  const servicesNotOffered = () => {
    return services?.map(service => {
      if (bookingRates?.find(singleRate => singleRate.serviceId === service.id) === undefined) {
       return <div key={service.id} className="card">
          <Link
            to={`/service/${service.id}`
            }>
            <h5 className="card-header">{service.name}</h5>
          </Link>
          <div className="card-body">
            <p className="card-text">{service.description}</p>
          </div>
        </div>
      }
    }
    )
  }

  return <>
    {cardBuilder()}
    {servicesNotOffered()}
  </>
}