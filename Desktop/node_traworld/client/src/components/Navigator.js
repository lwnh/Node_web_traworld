import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigator() {
    return (
    <>
        <Navbar bg="light" variant="light" fixed="top">
            <Navbar.Brand href="./">TRAWORLD</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="./home">Home</Nav.Link>
            <Nav.Link href="./about">About</Nav.Link>
            <Nav.Link href="./contact">Contact</Nav.Link>
            </Nav>
            <Button variant="outline-secondary" href="./login">LOGIN</Button>
        </Navbar>
    </>
    )
}

export default Navigator
