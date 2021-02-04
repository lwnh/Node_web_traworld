import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { TextField } from "@material-ui/core"
import axios from 'axios';

const SignupBlock = styled.div`
    display: block;
    margin: 0 auto;
    width: 70%;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const SignupContent = styled.div`
    background: #e9ecef;
    margin-top: 5rem;
    padding: 10rem 10rem;
    .btn-secondary {
        margin-top: 1rem;
        width: 100%
    }
    .btn-dark {
        margin-top: 1rem;
        width: 100%
    }
`;

function Signup({ history }) {
    const [inputs, setInputs] = useState({
        name: '',
        userid: '',
        userpw: '',
        pwcheck: '',
        email: ''
    });

    const { name, userid, userpw, pwcheck, email } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const signupSubmit = async (e) => {
        e.preventDefault();
        const data = inputs;
        try {
            await axios.post('/api/signup', data)
                .then((response) => {
                    console.log(response.data.success)
                    console.log(response.data.msg)

                    switch (response.data.success) {
                        case 200:   //success
                            alert('회원가입이 완료되었습니다.')
                            history.push('/');
                            break;
                        case 201:   //fail
                            alert('회원가입에 실패했습니다. 다시 시도해주세요')
                            setInputs({ ...inputs, userpw: '' })
                            break;
                        case 100:   // server error
                            break;
                    }
                })
        } catch (error) {
            console.log(error);
            alert('회원가입에 실패했습니다.');
        }
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <SignupBlock>
            <SignupContent>
                <form onSubmit={signupSubmit}>
                    <TextField type="text" name="name" value={name} label="이름(Name)" onChange={onChange} variant="outlined" required fullWidth margin="normal" />
                    <TextField type="text" name="userid" value={userid} label="아이디(ID)" onChange={onChange} variant="outlined" required fullWidth margin="normal" />
                    <TextField type="password" name="userpw" value={userpw} label="비밀번호(Password)" onChange={onChange} variant="outlined" required fullWidth margin="normal" />
                    <TextField type="password" name="pwcheck" value={pwcheck} label="비밀번호 확인(Password Check)" onChange={onChange} variant="outlined" required fullWidth margin="normal" />
                    <TextField type="email" name="email" value={email} label="이메일(Email)" onChange={onChange} variant="outlined" required fullWidth margin="normal" />
                    <Button type="submit" variant="dark">SUBMIT</Button><br />
                    <Button variant="secondary" onClick={goBack}>CANCEL</Button><br />
                </form>
            </SignupContent>
        </SignupBlock>
    )
}

export default Signup
