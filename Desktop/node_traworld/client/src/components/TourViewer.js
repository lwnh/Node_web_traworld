import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const TitleText = styled.div`
    font-weight: bold; 
    font-size: 2rem;
    margin: 0 0.5rem;
`;

const ContentText = styled.div`
    text-align: left;
    font-size: 1rem;
    color: gray;
    margin: 0.5rem 0;
`;

const ImgStyle = styled.img`
    display: block;
    width: 100%;
    height: 300px;
`;

const modalStyle = {
    textAlign: "center",
};

function TourViewer({ visible, img, title, content, onClose }) {
    return (
        <>
            <Modal
                show={visible}
                onHide={onClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <TitleText>{title}</TitleText>
                </Modal.Header>
                <Modal.Body style={modalStyle}>
                    <ImgStyle src={img} alt={title} />
                    <ContentText>{content}</ContentText>
                    <Button color="secondary" href="">예약하기</Button>
                    <Button href="">후기보기</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default TourViewer