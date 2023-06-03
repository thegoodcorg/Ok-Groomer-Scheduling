import React from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServiceBookingRate, setOrUpdateRate } from "../Modules/GroomerBookingRateManager";
import { me } from "../Modules/authManager";
import { getService } from "../Modules/servicesManager";

export const EditBookingService = () => {

    const [groomerBookingRate, setGroomerBookingRate] = useState({});
    const { id } = useParams()
    const [currentUser, setCurrentUser] = useState({})
    const [currentService, setCurrentService] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        me().then((res) => {
            setCurrentUser(res);
        });
    }, []);

    useEffect(() => {
        if (Object.keys(currentUser).length > 0) {
            console.log("rendering...")
            getServiceBookingRate(id, currentUser.id)
                .then((res) => setGroomerBookingRate(res))
        } else {
            setGroomerBookingRate({})
        }
    }, [currentUser])

    useEffect(() => {
        getService(id)
            .then((res) => {
                setCurrentService(res)
            })
    }, [])

    const handleSaveClick = () => {
        groomerBookingRate.serviceId = parseInt(id);
        groomerBookingRate.groomerId = currentUser.id;
        setOrUpdateRate(id, currentUser.id, groomerBookingRate)
            .then(navigate(`/settings`))

    }
    const handleCheckbox = (e) => {
        const copy = { ...groomerBookingRate }
        copy.doesGroomerOffer = e.target.checked
        setGroomerBookingRate(copy)
    }

    return <>
        <div className="appointment-bar">
            <h3>Edit Rates</h3>
        </div>
        <div className="edit-subtext">
            <h4 className="mt-2">{currentService.name}</h4>
            <h5>{currentService.description}</h5>
        </div>
        <div className="hr-div">
            <div className="hr-rule">
            </div>
        </div>
        <Form>
            <FormGroup>
                <strong>Small Dog Price</strong>
                <Input type="number" name="smallDogRate" id="smallDogRate" placeholder={groomerBookingRate.smallDogPrice?.toFixed(2)}

                    onChange={(evt) => {
                        let copy = { ...groomerBookingRate };
                        copy.smallDogPrice = parseFloat(evt.target.value);
                        setGroomerBookingRate(copy);
                    }} /><br />

                <strong>Medium Dog Price</strong>
                <Input type="number" name="mediumDogRate" id="mediumDogRate" placeholder={groomerBookingRate.mediumDogPrice?.toFixed(2)}

                    onChange={(evt) => {
                        let copy = { ...groomerBookingRate };
                        copy.mediumDogPrice = parseFloat(evt.target.value);
                        setGroomerBookingRate(copy);
                    }} /><br />

                <strong>Large Dog Price</strong>
                <Input type="number" name="largeDogRate" id="largeDogRate" placeholder={groomerBookingRate.largeDogPrice?.toFixed(2)}

                    onChange={(evt) => {
                        let copy = { ...groomerBookingRate };
                        copy.largeDogPrice = parseFloat(evt.target.value);
                        setGroomerBookingRate(copy);
                    }} /><br />
                <strong>Estimated Time(in 1/10 of an hour)</strong>
                <Input className="mb-4" type="number" name="timeToComplete" id="timeToComplete" placeholder={groomerBookingRate.timeToComplete?.toFixed(1)}

                    onChange={(evt) => {
                        let copy = { ...groomerBookingRate };
                        copy.timeToComplete = parseFloat(evt.target.value);
                        setGroomerBookingRate(copy);
                    }} />
                <input type="checkbox" name="doesGroomerOffer" checked={groomerBookingRate.doesGroomerOffer} onChange={(e) => { handleCheckbox(e) }} /><span className="ms-2">Do you offer this service?</span>
            </FormGroup>
            <div className="delete-appointment-button">
                <Button className="btn btn-primary" onClick={() => {
                    navigate(`/settings`);
                }}>Cancel</Button>
                <Button className="btn btn-success ms-1" onClick={() => {
                    handleSaveClick()
                }}>Save</Button>
            </div>
        </Form>
    </>
}