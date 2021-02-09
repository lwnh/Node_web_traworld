import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { TextField } from "@material-ui/core"
import axios from 'axios';
import Title from './Title';

const ButtonBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
        width: 70%;
        margin-top: 20px;
    }
`;

function ContactForm() {
    const [inputs, setInputs] = useState({
        name: '',
        tel: '',
        email: '',
        message: '',
    });

    const { name, tel, email, message } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target; 
        setInputs({
            ...inputs, 
            [name]: value 
        });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = inputs;
        try {
            await axios.post('/api/contact', data)
            .then((response) => {
                alert('메세지가 전송되었습니다.');
            })
        } catch (error) {
            alert('메세지 전송에 실패했습니다.');
        }
        setInputs({
            name: '',
            tel: '',
            email: '',
            message: '',
        })
    }

    return (
        <div>
            <Title>CONTACT</Title>
            <form onSubmit={handleSubmit}>
                    <TextField type="text" name="name" value={name} onChange={onChange} label="이름(Name)" variant="outlined" required fullWidth margin="normal"/>
                    <TextField type="tel" name="tel" value={tel} onChange={onChange} label="전화번호(Phone Number)" variant="outlined" required fullWidth margin="normal"/>
                    <TextField type="email" name="email" value={email} onChange={onChange} label="이메일(Email)" variant="outlined" required fullWidth margin="normal"/>
                    <TextField type="textarea" name="message" value={message} onChange={onChange} label="메세지(Message)" variant="outlined" required fullWidth margin="normal" multiline rows={5}/>
                    <ButtonBlock>
                        <Button type="submit" variant="dark">SEND</Button>
                    </ButtonBlock>
            </form>
        </div>
    )
}

export default ContactForm