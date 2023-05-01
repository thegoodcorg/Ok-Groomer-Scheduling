import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Modules/authManager";
import { loginAsUser } from "../Modules/OwnerManager";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginAsGroomer, setLoginAsGroomer] = useState(false)

  const loginSubmit = (e) => {
    e.preventDefault();
    if (loginAsGroomer == false) {
      loginAsUser(email, password)
        .then(() => navigate("/"))
        .catch(() => alert("Invalid email or password"));
    } if(loginAsGroomer == true){
      login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
    }
  } 

  const handleCheckbox = (e) => {
    setLoginAsGroomer(e.target.checked)
  }

  return (
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
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
          <Input type="checkbox" onChange={(e) => { handleCheckbox(e) }}></Input>
          <span>are you logging in as a groomer?</span>
          <br />
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
  );
}