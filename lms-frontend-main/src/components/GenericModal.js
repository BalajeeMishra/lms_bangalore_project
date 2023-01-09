import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from "../../pages/api/api"

function GenericModal(props) {
    function handleClose() {
        props.setShowModal(false);
        if (props && props.setDocKey) props.setDocKey(null)
    }
    const docUrl = api.defaults.baseURL + "material?download&key=";
    function downloadMaterial() {
        if (props && props.download) {
            window.location.href = docUrl + props.download
        }
    }
    return (
        <>
            <Modal show={props.showModal} onHide={handleClose} dialogClassName={props.xl ? "modal-xl" : ""} className={props.xl ? 'vidModal' : ''}>
                <Modal.Header closeButton>
                    {props.header}
                </Modal.Header>
                <Modal.Body>
                    {props.content}
                </Modal.Body>
                {!props.hideClose &&
                    <Modal.Footer>
                        {props.download &&
                            <Button variant="secondary" onClick={downloadMaterial}>
                                Download
                            </Button>
                        }
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                }
            </Modal>
        </>
    );
}

export default GenericModal