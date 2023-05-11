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

    return <Form>
        <h3>Create a new service</h3>
        <div>This will add a new service that every employee can set their rates for.</div>
        <FormGroup>
            <strong>Service Name</strong>
            <Input type="text" name="serviceName" id="serviceName" onChange={(evt) => {
                let copy = { ...service };
                copy.name = (evt.target.value);
                setService(copy);
            }} /><br />

            <strong>Description</strong>
            <Input type="text" name="serviceDescription" id="serviceDescription" placeholder={service.description}

                onChange={(evt) => {
                    let copy = { ...service };
                    copy.description = (evt.target.value);
                    setService(copy);
                }} /><br />
        </FormGroup><Button className="btn btn-primary" onClick={() => {
            navigate(`/settings`);
        }}>Cancel</Button>
        <Button className="btn btn-primary" onClick={() => {
            handleSaveClick()
        }}>Save</Button>
    </Form>
}