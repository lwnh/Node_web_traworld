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
    margin: 0 50px;

`;

const FormBlock =  styled.div`
    float: right;
    margin: 0 50px;
    padding: 0 50px 0 0;
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
