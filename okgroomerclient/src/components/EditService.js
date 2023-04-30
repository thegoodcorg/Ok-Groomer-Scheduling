import React from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServiceBookingRate } from "../Modules/GroomerBookingRate.Manager";




export const EditService = () => {

    const { id } = useParams()

    const navigate = useNavigate();


    const [GroomerBookingRate, setGroomerBookingRate] = useState({});

    useEffect(() => {
        getServiceBookingRate(id)
            .then((res) => setGroomerBookingRate(res))
    }, [])

    return <Form>
        <h3>Edit service</h3>
        <FormGroup>
            <strong>Small Dog Price</strong>
            <Input type="text" name="title" id="title" placeholder={GroomerBookingRate.smallDogPrice}

                onChange={(evt) => {
                    let copy = { ...GroomerBookingRate };
                    copy.smallDogPrice = evt.target.value;
                    setGroomerBookingRate(copy);
                }} /><br/>

            <strong>Medium Dog Price</strong>
            <Input type="text" name="content" id="content" placeholder={GroomerBookingRate.mediumDogPrice}

                onChange={(evt) => {
                    let copy = { ...GroomerBookingRate };
                    copy.content = evt.target.value;
                    setGroomerBookingRate(copy);
                }} /><br/>

            <strong>Large Dog Price</strong>
            <Input type="text" name="category" id="category" placeholder={GroomerBookingRate.largeDogPrice}

                onChange={(evt) => {
                    let copy = { ...GroomerBookingRate };
                    copy.categoryId = parseInt(evt.target.value);
                    setGroomerBookingRate(copy);
                }} /><br/>
                <strong>Estimated Time(in 1/10 of an hour)</strong>
            <Input type="text" name="category" id="category" placeholder={GroomerBookingRate.timeToComplete}

                onChange={(evt) => {
                    let copy = { ...GroomerBookingRate };
                    copy.categoryId = parseInt(evt.target.value);
                    setGroomerBookingRate(copy);
                }} />
        </FormGroup><Button className="btn btn-primary" onClick={() => {
            navigate(`/GroomerBookingRate`);
        }}>Cancel</Button>
        <Button className="btn btn-primary" onClick={() => {

            
        }}>Save</Button>
    </Form>
}