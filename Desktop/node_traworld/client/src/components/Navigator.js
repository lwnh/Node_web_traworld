import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Navigator() {
    const isLogin = sessionStorage.getItem('user');
    console.log(isLogin);

    const logoutHandler = async () => {
        sessionStorage.removeItem('user');
        try {
            await axios.post('/api/logout')
                .then((response) => {
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar bg="light" variant="light" fixed="top">
                <Navbar.Brand href="./">TRAWORLD</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="./">Home</Nav.Link>
                    <Nav.Link href="./about">About</Nav.Link>
                    <Nav.Link href="./tour">Tour</Nav.Link>
                    <Nav.Link href="./contact">Contact</Nav.Link>
                </Nav>
                {isLogin ? <Button variant="outline-secondary" onClick={logoutHandler} href='/'>LOGOUT</Button> : <Button variant="outline-secondary" href="./login">LOGIN</Button>}
            </Navbar>
        </>
    )
}

export default Navigator
