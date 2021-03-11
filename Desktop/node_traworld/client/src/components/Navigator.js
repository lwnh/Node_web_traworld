import React, { useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const textStyle = {
    margin: "10px",
    color: "#6E757C",
}

function Navigator() {
    const isLogin = sessionStorage.getItem('user');

    useEffect(() => {
        userHandler();
    }, [])

    const userHandler = async () => {
        try {
            await axios.post('/api/')
                .then((response) => {
                    if (response.data.user) {
                        sessionStorage.setItem('user', response.data.user);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

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
                {isLogin && (<a href="./userInfo" style={textStyle}>{isLogin}님</a>)}
                {isLogin ? (
                    <Button variant="outline-secondary" onClick={logoutHandler} href='/'>LOGOUT</Button>
                ) : <Button variant="outline-secondary" href="./login">LOGIN</Button>}
            </Navbar>
        </>
    )
}

export default Navigator
