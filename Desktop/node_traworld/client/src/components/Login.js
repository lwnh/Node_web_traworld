import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { TextField } from "@material-ui/core"
import axios from 'axios';
import Title from './Title';

const LoginBlock = styled.div`
    display: flex;
    margin: 0 auto;
    width: 70%;
    align-items: center;
    justify-content: center;
    background: #e9ecef;
`;

const LoginContent = styled.div`
    margin-top: 3rem;
    padding: 14rem 10rem;
    text-align: center;
    .btn-secondary {
        margin-top: 2rem;
        width: 100%;
    }
    .btn-dark {
        margin-top: 1rem;
        width: 100%;
    }
    .btn-primary {
        margin-top: 1rem;
        width: 100%;
        background-color: #4267B2;
        border : 1px solid#4267B2;
    }
`;

function Login() {
    const [inputs, setInputs] = useState({
        userid: '',
        userpw: '',
    });

    const { userid, userpw } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        const data = inputs;
        try {
            await axios.post('/api/login', data)
                .then((response) => {
                    switch (response.data.success) {
                        case 200:   //success
                            sessionStorage.setItem('user', response.data.user);
                            window.location.replace('/');
                            break;
                        case 201:   //password fail
                            alert(response.data.message)
                            setInputs({ ...inputs, userpw: '' })
                            break;
                        case 202:   //user undefined
                            alert(response.data.message)
                            setInputs({ userid: '', userpw: '' })
                            break;
                    }
                })
        } catch (error) {
            console.log(error);
            alert('로그인에 실패했습니다.');
        }
    }

    return (
        <LoginBlock>
            <LoginContent>
                <Title>Login</Title>
                <form onSubmit={loginSubmit}>
                    <TextField type="text" name="userid" label="ID" required fullWidth margin="normal" onChange={onChange} value={userid} />
                    <TextField type="password" name="userpw" label="PASSWORD" required fullWidth margin="normal" onChange={onChange} value={userpw} />
                    <Button type="submit" variant="secondary">Login</Button><br />
                    <Button variant="dark" href="./signup">Sign Up</Button>
                    <a href="http://localhost:3000/api/auth/facebook">
                        <Button variant="primary">Login with Facebook</Button>
                    </a>
                </form>
            </LoginContent>
        </LoginBlock>
    )
}

export default Login
