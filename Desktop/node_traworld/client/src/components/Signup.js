import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { TextField } from "@material-ui/core"
import axios from 'axios';
import Title from './Title';

const SignupBlock = styled.div`
    display: flex;
    margin: 0 auto;
    width: 70%;
    align-items: center;
    justify-content: center;
    background: #e9ecef;
`;

const SignupContent = styled.div`
    margin-top: 5rem;
    padding: 5rem 10rem;
    text-align: center;
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
        name: {
            value: '',
            error: false,
        },
        userid: {
            value: '',
            error: false,
        },
        userpw: {
            value: '',
            error: false,
        },
        pwcheck: {
            value: '',
            error: false,
        },
        email: {
            value: '',
            error: false,
        },
    });

    const { name, userid, userpw, pwcheck, email } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: {
                value,
                error: !isValidate(name, value),
            }
        });
    };

    const isValidate = (name, value) => {
        let nameReg = /^[가-힝]{2,}$/;
        let idReg = /^[a-zA-Z0-9]{4,12}$/;
        let pwReg = /^[a-zA-z0-9]{4,12}$/;
        let emailReg = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        switch (name) {
            case "name":
                return value.match(nameReg) ? true : false;
            case "userid":
                return value.match(idReg) ? true : false;
            case "userpw":
                return value.match(pwReg) ? true : false;
            case "pwcheck":
                return inputs.userpw.value === value ? true : false;
            case "email":
                return value.match(emailReg) ? true : false;
        }
    };

    const signupSubmit = async (e) => {
        e.preventDefault();
        let data = inputs;
        if (data.name.error || data.userid.error || data.userpw.error || data.pwcheck.error || data.email.error) {
            return alert('에러메세지를 확인해주세요');
        } else {
            data = { name: name.value, userid: userid.value, userpw: userpw.value, email: email.value };
            try {
                await axios.post('/api/signup', data)
                    .then((response) => {
                        switch (response.data.success) {
                            case 200:   //success
                                alert(response.data.message);
                                window.location.replace('/login');
                                break;
                            case 201:   //fail
                                alert(response.data.message);
                                window.location.reload();
                                break;
                        }
                    })
            } catch (error) {
                console.log(error);
                alert('회원가입에 실패했습니다.');
            };
        };
    };

    const goBack = () => {
        history.goBack();
    };

    return (
        <SignupBlock>
            <SignupContent>
                <Title>Sign Up</Title>
                <form onSubmit={signupSubmit}>
                    <TextField type="text" name="name" value={name.value} label="이름(Name)" onChange={onChange} variant="outlined" required fullWidth margin="normal" error={name.error} helperText={name.error && "이름을 확인하세요.(한글 2글자 이상)"} />
                    <TextField type="text" name="userid" value={userid.value} label="아이디(ID)" onChange={onChange} variant="outlined" required fullWidth margin="normal" error={userid.error} helperText={userid.error && "아이디를 확인하세요.(영문자 혹은 숫자 4~12자 이내)"} />
                    <TextField type="password" name="userpw" value={userpw.value} label="비밀번호(Password)" onChange={onChange} variant="outlined" required fullWidth margin="normal" error={userpw.error} helperText={userpw.error && "비밀번호를 확인하세요.(영문자 혹은 숫자 4~12자 이내)"} />
                    <TextField type="password" name="pwcheck" value={pwcheck.value} label="비밀번호 확인(Password Check)" onChange={onChange} variant="outlined" required fullWidth margin="normal" error={pwcheck.error} helperText={pwcheck.error && "비밀번호가 일치하지 않습니다."} />
                    <TextField type="email" name="email" value={email.value} label="이메일(Email)" onChange={onChange} variant="outlined" required fullWidth margin="normal" error={email.error} helperText={email.error && "이메일 형식을 확인해주세요."} />
                    <Button type="submit" variant="dark">SUBMIT</Button><br />
                    <Button variant="secondary" onClick={goBack}>CANCEL</Button><br />
                </form>
            </SignupContent>
        </SignupBlock>
    )
}

export default Signup
