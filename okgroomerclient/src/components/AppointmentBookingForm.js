import React, { useEffect } from 'react'
import { useState } from 'react'
import { AppointmentBooking } from './AppointmentBooking/AppointmentBooking';
import { AppointmentDogInfo } from './AppointmentBooking/AppointmentDog';
import { AppointmentGroomerInfo } from './AppointmentBooking/AppointmentGroomerInfo';
import { me } from '../Modules/authManager';
import "../styles/AppointmentBooking.css"
import { getMyDogs } from '../Modules/DogManager';
import { getAllServices } from '../Modules/servicesManager';
import { AppointmentScheduler } from './AppointmentBooking/AppointmentScheduler';

export const AppointmentBookingForm = () => {

    const [page, setPage] = useState(0);
    const [x, setX] = useState(0);

    const [myDogs, setMyDogs] = useState([])
    const [user, setUser] = useState([])
    const [services, setServices] = useState([])

    const [formData, setFormData] = useState({
        ownerId: user.id,
        dogId: 0,
        dogName: "",
        dogWeight: null,
        selectedServices: [],
        serviceDetails: [],
        groomerId: 0,
        dateAndTime: null
    });

    useEffect(() => {
        detailsView(formData)

    }, [formData])

    useEffect(() => {
        let copy = { ...formData }
        copy.ownerId = user.id
        setFormData(copy)
    }, [user])

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
        getAllServices()
            .then((res) => {
                setServices(res)
            })
    }, [])

    const detailsView = (formData) => {
        return (
            <>
                <div className='dog-details custom-header'>
                    {formData.dogName}
                </div>
                <div className="v-rule"></div>
                <div className='appointment-building-details'>
                    <div className="custom-header">
                        Details
                    </div>
                    <div className="list-items-container">
                        <div className="list-items">
                            <div className="service-div">
                                <u>Service</u>
                                {formData.selectedServices.map((serviceId) => {
                                    const service = services.find((service) => service.id === serviceId);
                                    return <div className="details-item" key={serviceId}>{service.name}</div>;
                                })}
                            </div>
                        </div>
                        <div className="list-items">
                            <div className="service-div">
                                <u>Price</u>
                                {formData.serviceDetails.map((serviceDetail) => {
                                    return <div className="details-item" key={serviceDetail}>${serviceDetail.objPrice}</div>;
                                })}
                            </div>
                        </div>
                        <div className="list-items">
                            <div className="service-div">
                                <u>Time</u>
                                {formData.serviceDetails.map((serviceDetail) => {
                                    return <div className="details-item" key={serviceDetail}>{serviceDetail.objTimeToComplete === 1 ? `${serviceDetail.objTimeToComplete} hour` : `${serviceDetail.objTimeToComplete} hours`}</div>;
                                })}
                            </div>
                        </div>
                    </div>
                    <div>Total: ${formData.totalPrice}</div>
                </div>
            </>
        );
    };


    const componentList = [
        <AppointmentBooking formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            x={x}
            setX={setX}
            myDogs={myDogs} />,
        <AppointmentDogInfo formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            x={x}
            setX={setX}
            services={services}
        />,
        <AppointmentGroomerInfo formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            x={x}
            setX={setX}
        />,
        <AppointmentScheduler formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            x={x}
            setX={setX}
        />
    ];

    return (
        <div className="App">
            <div className="progress-bar">
                <div style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : "100%" }}></div>
            </div>
            <div className='bookingSelections'>
                {detailsView(formData)}
            </div>
            <div>{componentList[page]}
            </div>
        </div>
    );
}