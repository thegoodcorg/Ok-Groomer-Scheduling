import React from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editBookingRate, getServiceBookingRate } from "../Modules/GroomerBookingRateManager";




export const EditBookingService = () => {
    
    const [groomerBookingRate, setGroomerBookingRate] = useState({});
    const { id } = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        getServiceBookingRate(id)
            .then((res) => setGroomerBookingRate(res))
    }, [])

    return <Form>
        <h3>Edit Rates</h3>
            <h1><u>{groomerBookingRate?.service?.name}</u></h1>
        <FormGroup>
            <strong>Small Dog Price</strong>
            <Input type="number" name="smallDogRate" id="smallDogRate" placeholder={groomerBookingRate.smallDogPrice}

                onChange={(evt) => {
                    let copy = { ...groomerBookingRate };
                    copy.smallDogPrice = parseInt(evt.target.value);
                    setGroomerBookingRate(copy);
                }} /><br/>

            <strong>Medium Dog Price</strong>
            <Input type="number" name="mediumDogRate" id="mediumDogRate" placeholder={groomerBookingRate.mediumDogPrice}

                onChange={(evt) => {
                    let copy = { ...groomerBookingRate };
                    copy.mediumDogPrice = parseInt(evt.target.value);
                    setGroomerBookingRate(copy);
                }} /><br/>

            <strong>Large Dog Price</strong>
            <Input type="number" name="largeDogRate" id="largeDogRate" placeholder={groomerBookingRate.largeDogPrice}

                onChange={(evt) => {
                    let copy = { ...groomerBookingRate };
                    copy.largeDogPrice = parseInt(evt.target.value);
                    setGroomerBookingRate(copy);
                }} /><br/>
                <strong>Estimated Time(in 1/10 of an hour)</strong>
            <Input type="number" name="timeToComplete" id="timeToComplete" placeholder={groomerBookingRate.timeToComplete}

                onChange={(evt) => {
                    let copy = { ...groomerBookingRate };
                    copy.timeToComplete = parseInt(evt.target.value);
                    setGroomerBookingRate(copy);
                }} />
        </FormGroup><Button className="btn btn-primary" onClick={() => {
            navigate(`/settings`);
        }}>Cancel</Button>
        <Button className="btn btn-primary" onClick={() => {
            editBookingRate(groomerBookingRate)
            .then(navigate(`/settings`))
            
        }}>Save</Button>
    </Form>
}