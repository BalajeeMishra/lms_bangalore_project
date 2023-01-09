import { useState } from "react";
import Card from 'react-bootstrap/Card';
import GenericModal from "./GenericModal";
import api from "../../pages/api/api"
import Accordion from 'react-bootstrap/Accordion';

function ModuleMaterialsView(props) {

    const [showModal, setShowModal] = useState(false)
    const [docKey, setDocKey] = useState(null)
    function handleDocClick(mKey) {
        setDocKey(mKey)
        setShowModal(true);
    }

    return (
        <>
            {props.materials.length === 0 &&
                <label className="col-form-label form-label"> Looks like Module Materials list is empty, start adding Module Material</label>
            }
            {props.materials.length > 0 && props.materials.map((uris, index) => {
                return <CardViewDoc materials={uris} key={"key" + index} />
            })}

        </>
    )

    function Content(props) {
        const docUrl = api.defaults.baseURL + "material?key=" + props.docKey;

        return (
            <>
                <iframe width={"100%"} height={"100%"}
                    src={docUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </>
        )
    }

    function CardViewDoc(props) {
        return (
            <div>
                {props.materials && props.materials.length > 0 && props.materials.map((url, idx) => (
                    <>
                        {props.materials[idx] && props.materials[idx].file_list.length > 0 &&
                            <CardMap setDocKey={setDocKey} docKey={docKey} setShowModal={setShowModal} showModal={showModal} materials={props.materials[idx].file_list} cname={props.materials[idx].module_name} indx={idx} />
                        }
                    </>

                ))}
                {showModal && <GenericModal xl setShowModal={setShowModal} showModal={showModal} header={"Course Material"} download={docKey} setDocKey={setDocKey} content={<Content docKey={docKey} setDocKey={setDocKey} />} />}
            </div>
        );
    }

    function getFileName(fname) {
        let fileName = fname.slice(14, fname.length);
        return fileName
    }
    function CardMap(props) {

        return (
            <div >
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={props.indx.toString()} className="cursorPointer">
                            Module Name: {props.cname}  <i className="fas fa-angle-down float-right"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={props.indx.toString()}>
                            <Card.Body>
                                <div className="w-100" style={{ display: 'flex', flexFlow: 'wrap-reverse', flexWrap: 'wrap' }}>
                                    {props.materials && props.materials.length > 0 && props.materials.map((material, idx) => (
                                        <Card className='visible recordThumbView w-25 overflow-hidden' key={"material" + idx}>
                                            <img className="card-img-top cursorPointer" src="/assets/images/docThumbnail.svg" onClick={() => handleDocClick(material.Key)} />

                                            <Card.Body style={{ padding: "10px 2px" }}>
                                                <Card.Title className="breakwords">{getFileName(material.file_name)}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }

}

export default ModuleMaterialsView;
