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
import OkGroomerImage from './images/Ok_Groomer.png';
import corgibath from "./images/corgibath.jpg"

export default function Header({ isLoggedIn, userProfile, isGroomer }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate()




  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled beyond a certain threshold (e.g., 100 pixels from the top)
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Attach the event listener to the 'scroll' event
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
<div>
  <img className="bg-image" src={corgibath} alt="corgi in a bathtub with soap on his head and a rubber duck" />
  <Navbar className={scrolled ? 'scrolled-header' : 'header'} fixed="top" expand="md">
    <NavbarBrand tag={RRNavLink} to="/home">
      <h5>OK, Groomer</h5>
    </NavbarBrand>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>
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
                My Services
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

  );
}

{/* <div>
<img className="bg-image" src={corgibath} alt="corgi in a bathub with soap on his head and a rubber duck" />
   <Navbar  className={scrolled ? 'scrolled-header' : 'header'}  fixed="top" expand="md">
     <NavbarBrand tag={RRNavLink} to="/home">
       <h5>OK, Groomer</h5>
     </NavbarBrand>
     <NavbarToggler onClick={toggle} />
     <Collapse isOpen={isOpen} navbar>
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
                 My Services
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
 </div> */}
