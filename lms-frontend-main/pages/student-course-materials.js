import { useEffect, useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import Card from "react-bootstrap/Card";
import GenericModal from "../src/components/GenericModal";
import StudentService from "./api/student.service";
import api from "../pages/api/api.js";
import Accordion from "react-bootstrap/Accordion";

function CourseMaterials() {
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    const chunk = 3;
    StudentService.listCourseMaterial().then((res) => {
      if (res && res.status === 200) {
        splitIntoChunk(res.data.data, chunk);
      }
    });
  }, []);


  useEffect(() => {
    const chunk = 4;
    StudentService.listModuleMaterial().then(res => {
      if (res && res.status === 200) {
        console.log(res.data.data)
        splitIntoChunk(res.data.data, chunk, "module");
      }
    })
  }, [])


  useEffect(() => { }, [materials]);

  function splitIntoChunk(arr, chunk) {
    let allChunks = [];
    for (let i = 0; i < arr.length; i += chunk) {
      let chunkArray;
      chunkArray = arr.slice(i, i + chunk);
      allChunks.push(chunkArray);
    }
    setMaterials(allChunks);
  }
  function getFileName(fname) {
    //taking consider of timestamp and underscore  = length = 14
    let fileName = fname.slice(14, fname.length);
    return fileName;
  }
  return (
    <Layout>
      <PageBanner pageName={"Course Materials"} />
      <section className="features-section-three rel z-1 pt-110 rpt-85 pb-100 rpb-70">
        <div className="container">
          <h5 className="text-center  pb-50">Course Materials</h5>
          <div className=" ">
            {materials.length === 0 && <label className="col-form-label form-label flex-Just-Center"> Looks like Course Materials list is empty</label>}
            {materials.length > 0 &&
              materials.map((uris, index) => {
                return <CardViewDoc materials={uris} key={"materials" + index} />;
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
  function Content(props) {
    const docUrl = api.defaults.baseURL + "material?key=" + props.docKey;
    return (
      <>
        <iframe width={"100%"} height={"100%"} src={docUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </>
    );
  }
  function CardViewDoc(props) {
    const [showModal, setShowModal] = useState(false);
    const [docKey, setDocKey] = useState(null);

    return (
      <>
        {props.materials &&
          props.materials.length > 0 &&
          props.materials.map((url, idx) => (
            <>
              {props.materials[idx] && props.materials[idx].file_list.length > 0 && (
                <CardMap setDocKey={setDocKey} docKey={docKey} setShowModal={setShowModal} showModal={showModal} materials={props.materials[idx].file_list} cname={props.materials[idx].course_name} indx={idx} />
              )}
            </>
          ))}
        {showModal && <GenericModal xl setShowModal={setShowModal} showModal={showModal} header={"Course Material"} setDocKey={setDocKey} content={<Content docKey={docKey} setDocKey={setDocKey} />} download={docKey} />}
      </>
    );
  }
  function CardMap(props) {
    useEffect(() => {
      if (props.docKey) {
        props.setShowModal(true);
      }
    }, [props.docKey]);

    function handleDocClick(mKey) {
      props.setDocKey(mKey);
    }

    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.indx.toString()} className="cursorPointer">
              Module Name: {props.cname} <i className="fas fa-angle-down float-right"></i>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.indx.toString()}>
              <Card.Body>
                <div className="w-100" style={{ display: "flex", flexFlow: "wrap-reverse", flexWrap: "wrap" }}>
                  {props.materials &&
                    props.materials.length > 0 &&
                    props.materials.map((material, idx) => (
                      <Card className="visible recordThumbView w-25" key={"material" + idx}>
                        <img className="card-img-top cursorPointer" src="/assets/images/docThumbnail.svg" onClick={() => handleDocClick(material.Key)} />
                        <Card.Body>
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
    );
  }
}

export default CourseMaterials;
