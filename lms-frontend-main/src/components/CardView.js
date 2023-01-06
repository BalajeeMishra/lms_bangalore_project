import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import VideoModal from "./VideoModal";

function CardView(urls) {
  const [showModal, setShowModal] = useState(false);
  const [vidKey, setVidKey] = useState(false);
  return (
    <>
      <Row className="g-4" style={{ display: "flex" }}>
        {Array.from({ length: 3 }).map((url, idx) => (
          <Col style={{ margin: "20px 20px 20px 0" }} key={idx}>
            {urls.uris[idx] && (
              <Card className="visible recordThumbView">
                <img
                  className="card-img-top"
                  src="/assets/images/videothumbnail.svg"
                  onClick={() => {
                    setShowModal(true);
                    setVidKey(urls.uris[idx].Key);
                  }}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "12px" }}>{urls.uris[idx].file_name}</Card.Title>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>
      <VideoModal showModal={showModal} setShowModal={setShowModal} urlKey={vidKey} />
    </>
  );
}

export default CardView;
