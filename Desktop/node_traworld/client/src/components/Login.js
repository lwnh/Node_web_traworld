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
        width: 100%
    }
    .btn-dark {
        margin-top: 1rem;
        width: 100%
    }
`;

function Login({ history }) {
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
                            sessionStorage.setItem('user', response.data.userid)
                            // history.push('/');
                            window.location.replace('/');
                            break;
                        case 201:   //fail
                            alert('아이디와 비밀번호를 확인해주세요.')
                            setInputs({ ...inputs, userpw: '' })
                            break;
                        case 100:   // server error
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
                    <Button type="submit" variant="secondary">LOGIN</Button><br />
                    <Button variant="dark" href="./signup">SIGN UP</Button>
                </form>
            </LoginContent>
        </LoginBlock>
    )
}

export default Login
