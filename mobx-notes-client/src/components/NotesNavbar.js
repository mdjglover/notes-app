import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

export const NotesNavbar = (props) => {
    let navLinks = null;
    let navButton = null;
    if (!props.loggedIn) {
        navLinks = (
            <React.Fragment>
                <Link className="nav nav-link" to="/register">Register</Link>
                <Link className="nav nav-link" to="/login">Login</Link>
            </React.Fragment>
        );
    } else {
        navButton = (
            <Button variant="primary">
                Logout
            </Button>
        );
    }

    return (
        <Container>
            <Navbar bg="dark" variant="dark">
                <Link to="/"><Navbar.Brand>Notes</Navbar.Brand></Link>
                <Nav className="ml-auto">
                    {navLinks}
                    {navButton}
                </Nav>
            </Navbar>
        </Container>
    );
};
