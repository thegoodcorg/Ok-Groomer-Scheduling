import React, { useState, useEffect } from "react";
import { getAllServices } from "../Modules/servicesManager";
import { Link } from "react-router-dom";
import { me } from "../Modules/authManager";
import { getBookingRatesByGroomerId } from "../Modules/GroomerBookingRateManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { ImageUpload } from "../ImageUpload";

export const RateSettings = () => {
  const [services, setServices] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [bookingRates, setBookingRates] = useState(null)

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
      <div key={singleRate.id} className="card appointment-card">
          <h5 className="card-header">{singleRate.service.name}</h5>
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
                    <FontAwesomeIcon className="font-awesome-icon" icon={faSquareCheck} size="xl" style={{ color: "#24943a" }} />
                    You are offering this service.
                  </div>
                </div>
              ) : null)
            }
          </span>
          <p className="card-text">{singleRate.service.description}</p>
        </div>
        <Link
          className="link-button"
          to={`/service/${singleRate.serviceId}`
          }>
          Edit rate
        </Link>
      </div>
    )
  }


  const servicesNotOffered = () => {
    return services?.map(service => {
      if (bookingRates?.find(singleRate => singleRate.serviceId === service.id) === undefined) {
        return <div key={service.id} className="card">
            <h5 className="card-header">{service.name}</h5>
          <div className="card-body">
            <p className="card-text">{service.description}</p>
          </div>
          <Link
          className="link-button-grey"
            to={`/service/${service.id}`
            }>
            Set rate
          </Link>
        </div>
      }
    }
    )
  }

  return <>
    <div className="appointment-bar"> 
      <h3>
        Set or create your individual job rates
      </h3>
    </div>
    <div className="appointment-cards">
      {cardBuilder()}
      {servicesNotOffered()}
    </div>
  </>
}