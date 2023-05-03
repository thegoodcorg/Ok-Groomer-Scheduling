import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { registerDog } from "../Modules/DogManager";
import { me } from "../Modules/authManager";




export const DogCreateForm = () => {

  const [dogObj, setDogObj] = useState({ name: "", weight: null, ownerId: null })
  const [currentUser, setCurrentUser] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    me().then((res) => {
      const copy = {...dogObj}
      copy.ownerId = res.id
      setDogObj(copy)
    });
  }, []);

  const registerClick = (e) => {
    e.preventDefault();
    registerDog(dogObj).then(() => navigate("/"));
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
          <Button>Save</Button>
        </FormGroup>
      </fieldset>
    </Form>
  </>
}