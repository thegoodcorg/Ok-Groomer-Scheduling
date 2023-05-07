import React, { useEffect, useState } from "react";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "./Modules/authManager";

export default function Header({ isLoggedIn, userProfile, isGroomer }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate()

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/home">
          Ok, Groomer!
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
            {isLoggedIn && !isGroomer ? (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="dogcreateform">
                    Add Dog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/appointments">
                    My Appointments
                  </NavLink>
                </NavItem>
              </>
            ) : ""}
          </Nav>
          <Nav className="mr-auto" navbar>
            {isLoggedIn && isGroomer ? (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/settings">
                    My Services
                  </NavLink>
                </NavItem>
              </>
            ) : ""}
          </Nav>
          <Nav className="mr-auto" navbar>
            <NavLink tag={RRNavLink} to="/services">
              Services
            </NavLink>
          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      logout()
                      navigate("/login")
                    }} 
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
