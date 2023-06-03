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
import corgibath from "./images/corgibath.jpg"

export default function Header({ isLoggedIn, userProfile, isGroomer }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate()




  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div>
      <img className="bg-image" src={corgibath} alt="corgi in a bathtub with soap on his head and a rubber duck" />
      <div>
        <Navbar className={scrolled ? 'scrolled-header-container' : 'header-container'} fixed="top" expand="md">
          <NavbarBrand className={scrolled ? 'scrolled-header' : 'header'}  tag={RRNavLink} to="/home">
            <h5>OK, Groomer</h5>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse className={scrolled ? 'scrolled-header' : 'header'} isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
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
                      My Settings
                    </NavLink>
                  </NavItem>
                  <Nav className="mr-auto" navbar>
                    <NavLink tag={RRNavLink} to="/services">
                      Services
                    </NavLink>
                  </Nav>
                </>
              ) : ""}
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
    </div>
  );
}