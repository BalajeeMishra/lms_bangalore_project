import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../pages/api/api.js";

function VideoModal(props) {
  const [show, setShow] = useState(props.showModal);
  const handleClose = () => props.setShowModal(false);
  const baseUrl = api.defaults.baseURL + "material?key=" + props.urlKey;
  return (
    <>
      <Modal show={props && props.showModal} onHide={handleClose} dialogClassName="modal-xl" className="vidModal">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ overflow: "hidden" }}>
          <video
            width="100%"
            height="100%"
            controls
            controlsList="nodownload"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <source src={baseUrl} type="video/mp4" />
            {/* <source src="https://drive.google.com/file/d/1jZ2A2r7sR2IRPTdeeGRU2EJ-60OrrHWZ/view?usp=sharing" type="video/mp4" /> */}
          </video>
          {/* <iframe width={"100%"} height={"100%"}
                        src={baseUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VideoModal;
