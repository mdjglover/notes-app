import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

export const NotesNavbar = (props) => {
    let navLinks;
    let navButton;
    if (!props.loggedIn) {
        navLinks = (
            <React.Fragment>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </React.Fragment>
        );
    } else {
        navButton = (
            <Button variant="primary" onClick={props.handleLogout}>
                Logout
            </Button>
        );
    }

    return (
        <Container>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Notes</Navbar.Brand>
                <Nav className="ml-auto">
                    {navLinks}
                    {navButton}
                </Nav>
            </Navbar>
        </Container>
    );
};
