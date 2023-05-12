import React from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { me } from "../Modules/authManager";
import { addService } from "../Modules/servicesManager";




export const ServiceForm = () => {

    const [service, setService] = useState({});
    const [currentUser, setCurrentUser] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        me().then((res) => {
            setCurrentUser(res);
        });
    }, []);

    const handleSaveClick = () => {
        service.groomerId = parseInt(currentUser.id)
        addService(service)
            .then(navigate(`/settings`))
    }

    return <>
        <div className="appointment-bar">
            <h3>Create a new service</h3>
        </div>
        <h5 className="mt-4">This will add a new service that every employee can set their rates for.</h5>
        <div className="hr-div">
            <div className="hr-rule">

            </div>
        </div>
        <Form className="create-form">
            <FormGroup>
                <strong>Service Name</strong>
                <Input type="text" name="serviceName" id="serviceName" onChange={(evt) => {
                    let copy = { ...service };
                    copy.name = (evt.target.value);
                    setService(copy);
                }} /><br />

                <strong>Description</strong>
                <Input type="textarea" className="serviceDescription dog-note-input" id="serviceDescription" placeholder={service.description}

                    onChange={(evt) => {
                        let copy = { ...service };
                        copy.description = (evt.target.value);
                        setService(copy);
                    }} /><br />
            </FormGroup>
            <div className="delete-appointment-button">
                <Button className="btn btn-secondary" onClick={() => {
                    navigate(`/settings`);
                }}>Cancel</Button>
                <Button className="btn btn-success ms-1" onClick={() => {
                    handleSaveClick()
                }}>Save</Button>
            </div>
        </Form>
    </>
}