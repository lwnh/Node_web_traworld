import React from 'react'
import styled from 'styled-components';
import imgCanada from '../images/img_canada.jpg';
import imgParis from '../images/img_paris.jpg';
import imgRome from '../images/img_rome.jpg';
import imgSingapore from '../images/img_singapore.jpg';
import imgTaipei from '../images/img_taipei.jpg';
import imgUsa from '../images/img_usa.jpg';
import { GridList } from '@material-ui/core';

const TourBlock = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    background: lightgray;
    padding: 100px;
`;

const openImageViewr = () => {

}

function Tour() {
    const images = [imgCanada, imgParis, imgRome, imgSingapore, imgTaipei, imgUsa]
    return (
        <TourBlock>
            <GridList cols={3} spacing={15}>
                {images.map((src, index) => (
                    <img
                        src={src}
                        onClick={() => openImageViewr(index)}
                        width="400px"
                        height="260px"
                        key={index}
                        alt=""
                    />
                ))}
            </GridList>
        </TourBlock>
    )
}

export default Tour
