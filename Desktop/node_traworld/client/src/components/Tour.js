import React, { useState } from 'react'
import styled from 'styled-components';
import TourCard from './TourCard';
import TourViewer from './TourViewer';

import imgUsa from '../images/img_usa.jpg';
import imgCanada from '../images/img_canada.jpg';
import imgFrance from '../images/img_paris.jpg';
import imgItaly from '../images/img_rome.jpg';
import imgSingapore from '../images/img_singapore.jpg';
import imgTaiwan from '../images/img_taipei.jpg';
import imgThailand from '../images/img_thailand.jpg';
import imgVietnam from '../images/img_vietnam.jpg';

const TourBlock = styled.div`
    display: flex;
    background: lightgray;
`;

const TourContent = styled.div`
    padding: 5rem 0;
`;

const CardBlock = styled.div`
    display: flex; 
    flex-flow: row wrap;
    width: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
`;

function Tour() {
    const countryItem = [
        {
            src: imgUsa,
            name: '미국(USA)',
            detail: '[BEST] [2박3일] LA투어(야경포함), LALALAND 촬영지 투어(그리피스 천문대, 할리우드 사인)',
            rating: 4.5,
            price: '750,000원',
        },
        {
            src: imgCanada,
            name: '캐나다(Canada)',
            detail: '[4박5일] 캐나다 동부(퀘벡+몬트리울) 핵심 패키지 투어(샤토 프롱트낙 호텔, 쁘띠 샹플랭)',
            rating: 4,
            price: '1,990,000원',
        },
        {
            src: imgFrance,
            name: '프랑스(France)',
            detail: '[일일투어] 파리시내 + 몽마르트 가성비 만점 차량투어 (10가지 할인 혜택)',
            rating: 5,
            price: '55,000원',
        },
        {
            src: imgItaly,
            name: '이탈리아(Italy)',
            detail: '[2박3일] 로마 시내부터 남부까지 풀코스 투어 (당일예약 가능)',
            rating: 4,
            price: '250,000원',
        },
        {
            src: imgSingapore,
            name: '싱가폴(Singapore)',
            detail: '[3박4일] 싱가폴 완전정복 투어! 마리나 베이 샌즈 전망대부터 가든스 바이 더 베이까지',
            rating: 5,
            price: '990,000원',
        },
        {
            src: imgTaiwan,
            name: '대만(Taiwan)',
            detail: '[BEST] [일일투어] 예스진지+지우펀 160분 홍등 버스투어 버블티시먼역 (당일예약 가능)',
            rating: 2.5,
            price: '49,000원',
        },
        {
            src: imgThailand,
            name: '태국(Thailand)',
            detail: '[일일투어] 방콕 숨은 골목 도보여행, 리얼 방콕투어 (당일예약 가능)',
            rating: 3.5,
            price: '20,000원',
        },
        {
            src: imgVietnam,
            name: '베트남(Vietnam)',
            detail: '[일일투어] 다낭 바나힐 체크아웃 단독투어+12시간 내맘대로 차량이용+공항드랍',
            rating: 4,
            price: '90,000원',
        },
    ];

    const [currentItem, setCurrentItem] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewr = (index) => {
        setCurrentItem(index);
        setIsViewerOpen(true);
    }

    const closeImageViewer = () => {
        setCurrentItem(0);
        setIsViewerOpen(false);
    };

    return (
        <TourBlock>
            <TourContent>
                <CardBlock>
                    {countryItem.map((item, index) =>
                        <TourCard
                            key={index}
                            img={item.src}
                            country={item.name}
                            detail={item.detail}
                            rating={item.rating}
                            price={item.price}
                            onClick={() => openImageViewr(index)}
                        />
                    )}
                </CardBlock>
                {isViewerOpen && (
                    <TourViewer
                        visible={isViewerOpen}
                        img={countryItem[currentItem].src}
                        title={countryItem[currentItem].name}
                        content={countryItem[currentItem].detail}
                        onClose={closeImageViewer}
                    />
                )}
            </TourContent>
        </TourBlock>
    );
}

export default Tour
