import React from 'react'
import styled from 'styled-components';

const AboutBlock = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background: #e0e0e0;
    margin: 0 auto;
`;

const Title = styled.div`
    float: left;
    text-align: right;
    font-size: 3rem;
    font-weight: bold; 
    color: #757575; 
    margin: 0 30px 0 100px;
    text-shadow: 1px 1px 10px white;
`;

const Content = styled.div`
    float: right; 
    text-align: left; 
    padding-left: 30px;
    margin-right: 100px; 
    border-left: 3px solid #bdbdbd; 
    color: #757575; 
    line-height: 30px;
    font-weight: bold; 
`;

function About() {
    return (
        <AboutBlock>
            <Title>
                ABOUT<br/>TRAWORLD<br/>
            </Title>
            <Content>
                TRAWORLD는 TRAVEL과 WORLD의 합성어로<br />
                여행객들을 위한 맞춤 여행추천 사이트입니다.<br />
                짧은 휴가로 단거리 여행을 고민 중이신 분들,<br />
                가족과 함께 떠나는 포근한 여행을 고민 중이신 분들,<br />
                애인과 함께 사랑스러운 여행을 고민 중이신 분들,<br />
                반려동물과 함께 하는 행복한 여행을 고민 중이신 분들,<br />
                TRAWORLD에서 뜻깊은 여행지를 선물해드립니다.<br />
                24시간 예약을 통해 언제나 설레는 여행을 떠나보세요!<br />
            </Content>
        </AboutBlock>
    )
}

export default About
