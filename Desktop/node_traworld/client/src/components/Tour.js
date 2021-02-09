import React from 'react';
import styled from 'styled-components';
import TourCard from './TourCard';
import imgCanada from '../images/img_canada.jpg';
import imgFrance from '../images/img_paris.jpg';
import imgItaly from '../images/img_rome.jpg';
import imgSingapore from '../images/img_singapore.jpg';
import imgTaiwan from '../images/img_taipei.jpg';
import imgUsa from '../images/img_usa.jpg';

const TourBlock = styled.div`
    display: flex;
    background: lightgray;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
`;

const TourContent = styled.div`
    padding: 5rem;
`;

const CardBlock = styled.div`
    display: flex; 
`;

function Tour() {
    return (
        <TourBlock>
            <TourContent>
                <CardBlock>
                    <TourCard img={imgUsa} country="미국(USA)" detail="lorem"></TourCard>
                    <TourCard img={imgCanada} country="캐나다(Canada)" detail="lorem"></TourCard>
                    <TourCard img={imgFrance} country="프랑스(France)" detail="lorem"></TourCard>
                </CardBlock>
                <CardBlock>
                    <TourCard img={imgItaly} country="이탈리아(Italy)" detail="lorem"></TourCard>
                    <TourCard img={imgSingapore} country="싱가폴(Singapore)" detail="lorem"></TourCard>
                    <TourCard img={imgTaiwan} country="대만(Taiwan)" detail="lorem"></TourCard>
                </CardBlock>
            </TourContent>
        </TourBlock>
    );
}

export default Tour
