import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Modules/authManager";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginAsGroomer, setLoginAsGroomer] = useState(false)

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate(`/home`))
      .catch(() => alert("Invalid email or password"));
  };

  const handleCheckbox = (e) => {
    setLoginAsGroomer(e.target.checked)
  }

  return (
    <div className="login-container">
      <Form
        className="login-box"
        onSubmit={loginSubmit}>
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
          <div className="login-buttons">
            <Button>Login</Button><br />
            <div className="register-button">
              <em>
                Not registered? <Link to="/register">Register</Link>
              </em>
            </div>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}