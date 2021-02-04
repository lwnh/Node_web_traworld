import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { TextField } from "@material-ui/core"
import axios from 'axios';

const LoginBlock = styled.div`
    display: block;
    margin: 0 auto;
    width: 70%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const LoginContent = styled.div`
    background: #e9ecef;
    margin-top: 5rem;
    padding: 15rem 10rem;
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
                    console.log('login.js', response);
                    switch (response.data.success) {
                        case 200:   //success
                            sessionStorage.setItem('user', JSON.stringify(response.data.userid))
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
