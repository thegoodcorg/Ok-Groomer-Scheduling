import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { registerDog } from "../Modules/DogManager";
import { me } from "../Modules/authManager";


export const DogCreateForm = () => {

  const [dogObj, setDogObj] = useState({ name: "", weight: null, ownerId: null })

  const navigate = useNavigate();

  useEffect(() => {
    me().then((res) => {
      const copy = { ...dogObj }
      copy.ownerId = res.id
      setDogObj(copy)
    });
  }, []);

  const registerClick = (e) => {
    e.preventDefault();
    registerDog(dogObj).then(() => navigate("/appointments"));
  };

  return <>
    <div className="appointment-bar">
      <h3>
        Add a new dog
      </h3>
    </div>
    <Form
      className="login-box mt-4"
      onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">Name</Label>
          <Input
            id="firstName"
            type="text"
            onChange={(e) => {
              const copy = { ...dogObj }
              copy.name = e.target.value
              setDogObj(copy)
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Weight</Label>
          <Input
            id="lastName"
            type="number"
            onChange={(e) => {
              const copy = { ...dogObj }
              copy.weight = parseInt(e.target.value)
              setDogObj(copy)
            }}
          />
        </FormGroup>
        <FormGroup>
          <div className="delete-appointment-button">
            <Button className="btn-success">Save</Button>
          </div>
        </FormGroup>
      </fieldset>
    </Form>
  </>
}