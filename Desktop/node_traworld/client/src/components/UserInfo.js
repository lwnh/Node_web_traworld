import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { TextField } from "@material-ui/core"
import axios from 'axios';
import Title from './Title';

const InfoBlock = styled.div`
    display: flex;
    margin: 0 auto;
    width: 70%;
    align-items: center;
    justify-content: center;
    background: #e9ecef;
`;

const InfoContent = styled.div`
    margin-top: 5rem;
    padding: 7rem 10rem;
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

function UserInfo() {
    const sessionId = { userid: sessionStorage.getItem('user') }
    const [userInfo, setUserInfo] = useState({
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
        email: {
            value: '',
            error: false,
        },
    });

    const { name, userid, userpw, email } = userInfo;

    useEffect(() => {
        if (!sessionId.userid) {
            alert('비정상 접근입니다.');
            window.location.replace('/');
        } else {
            infoHandler();
        }
    }, [])

    const infoHandler = async () => {
        try {
            await axios.post('/api/userinfo', sessionId)
                .then((response) => {
                    switch (response.data.success) {
                        case 200:   //success
                            const result = response.data.result[0];
                            setUserInfo({
                                ...userInfo,
                                name: { value: result.name },
                                userid: { value: result.userid },
                                email: { value: result.email },
                            })
                            break;
                        case 201:   //fail
                            alert('정보확인에 실패했습니다. 다시 시도해주세요.')
                            break;
                        case 100:   // server error
                            alert('네트워크를 확인해주세요.')
                            break;
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
        const { value, name } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: {
                value,
                error: !isValidate(name, value),
            }
        });
    };

    const isValidate = (name, value) => {
        let nameReg = /^[가-힝]{2,}$/;
        let pwReg = /^[a-zA-z0-9]{4,12}$/;
        let emailReg = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        switch (name) {
            case "name":
                return value.match(nameReg) ? true : false;
            case "userpw":
                return value.match(pwReg) ? true : false;
            case "email":
                return value.match(emailReg) ? true : false;
        }
    }

    const updateHandler = async (e) => {
        e.preventDefault();
        const data = userInfo;
        try {
            await axios.post('/api/update', data)
                .then((response) => {
                    switch (response.data.success) {
                        case 200:   //success
                            alert('정보수정이 완료되었습니다.')
                            window.location.reload();
                            break;
                        case 201:   //fail
                            alert('정보수정에 실패했습니다. 다시 시도해주세요.')
                            break;
                        case 100:   // server error
                            alert('네트워크를 확인해주세요.')
                            break;
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteHandler = async (e) => {
        e.preventDefault();
        sessionStorage.removeItem('user');

        const data = userInfo;
        try {
            await axios.post('/api/delete', data)
                .then((response) => {
                    switch (response.data.success) {
                        case 200:   //success
                            alert('회원탈퇴가 완료되었습니다.')
                            window.location.replace('/');
                            break;
                        case 201:   //fail
                            alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.')
                            break;
                        case 100:   // server error
                            alert('네트워크를 확인해주세요.')
                            break;
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <InfoBlock>
            <InfoContent>
                <Title>Information</Title>
                <form onSubmit={updateHandler}>
                    <TextField type="text" name="name" value={name.value} label="이름(Name)" onChange={onChange} variant="outlined" required fullWidth margin="normal" error={name.error} helperText={name.error && "이름을 확인하세요.(한글 2글자 이상)"} />
                    <TextField type="text" name="userid" value={userid.value} label="아이디(ID)" variant="outlined" required fullWidth margin="normal" disabled />
                    <TextField type="password" name="userpw" value={userpw.value} label="비밀번호(Password)" onChange={onChange} variant="outlined" required fullWidth margin="normal" error={userpw.error} helperText={userpw.error && "비밀번호를 확인하세요.(영문자 혹은 숫자 4~12자 이내)"} />
                    <TextField type="email" name="email" value={email.value} label="이메일(Email)" onChange={onChange} variant="outlined" required fullWidth margin="normal" error={email.error} helperText={email.error && "이메일 형식을 확인해주세요."} />
                    <Button type="submit" variant="dark">수정하기</Button><br />
                </form>
                <Button variant="secondary" onClick={deleteHandler}>회원탈퇴</Button><br />
            </InfoContent>
        </InfoBlock>
    )
}

export default UserInfo
