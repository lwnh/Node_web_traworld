import React from 'react'
import styled from 'styled-components';
import img from '../images/image_main.jpg';

const HomeBlock = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background: url(${img}) center center no-repeat;
`;

const TextBlock = styled.div`
    color: white;
    font-size: 4rem;
    text-shadow: 3px 3px 10px black;
    text-align: center;
    font-weight: bold; 
`;

function Home() {
    return (
        <HomeBlock>
            <TextBlock>
                WELCOME<br />
                TRAWORLD
            </TextBlock>
        </HomeBlock>
    )
}

export default Home