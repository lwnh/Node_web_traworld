import React from 'react'
import Modal from 'react-bootstrap/Modal'

function TourViewer({ visible, title, content, onClose}) {
    return (
        <>
            <Modal
                show={visible}
                onHide={onClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ content }</Modal.Body>
            </Modal>
        </>
    )
}

export default TourViewer