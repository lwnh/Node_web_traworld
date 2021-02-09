import React from 'react'
import styled from 'styled-components';
import Map from './Map';
import ConatctForm from './ContactForm';

const ContactBlock =  styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background: lightgray;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const MapBlock =  styled.div`
    float: left;
    margin: 0 10%;
`;

const FormBlock =  styled.div`
    float: right;
    padding: 0 10% 0 0;
`;

function Contact() {
    return (
        <ContactBlock>
            <MapBlock>
                <Map />
            </MapBlock>
            <FormBlock>
                <ConatctForm />
            </FormBlock>
        </ContactBlock>
    )
}

export default Contact
