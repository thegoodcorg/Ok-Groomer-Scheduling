import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Modules/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [registerAsGroomer, setRegisterAsGroomer] = useState(false)
  const [userProfile, setUserProfile] = useState({ firstName: "", lastName: "", email: "", groomer: false })

  // const handleCheckbox = (e) => {
  //   setUserProfile({ groomer: e.target.checked })
  // }

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      // const userProfile = {
      //   firstName,
      //   lastName,
      //   email
      // };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            onChange={(e) => {
              const copy = { ...userProfile }
              copy.firstName = e.target.value
              setUserProfile(copy)
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            onChange={(e) => {
              const copy = { ...userProfile }
              copy.lastName = e.target.value
              setUserProfile(copy)
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => {
              const copy = { ...userProfile }
              copy.email = e.target.value
              setUserProfile(copy)
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input type="checkbox" onChange={(e) => {
            const copy = { ...userProfile }
            copy.groomer = e.target.checked
            setUserProfile(copy)
          }}></Input><span>are you registering as a groomer?</span>
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
