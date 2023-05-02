import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Modules/authManager";



export const DogCreateForm = () => {

  const [dogObj, setDogObj] = useState({})

  const navigate = useNavigate();


  const registerClick = (e) => {
    e.preventDefault();
      register(dogObj).then(() => navigate("/"));
  };

    return <><div>This is where you will create a new dog</div>
        <Form onSubmit={registerClick}>
          <fieldset>
            <FormGroup>
              <Label htmlFor="firstName">Name</Label>
              <Input
                id="firstName"
                type="text"
                onChange={(e) => {
                  const copy = { ...dogObj }
                  copy.Name = e.target.value
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
                  copy.lastName = parseInt(e.target.value)
                  setDogObj(copy)
                }}
              />
            </FormGroup>
            <FormGroup>
              <Button>Save</Button>
            </FormGroup>
          </fieldset>
        </Form>
        </>
}