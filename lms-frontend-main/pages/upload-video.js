import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import FacLayout from "./faculty";
import FacultyService from "./api/faculty.service";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import Card from "react-bootstrap/Card";
import GenericModal from "../src/components/GenericModal";
import Accordion from "react-bootstrap/esm/Accordion";
import api from "./api/api";

const UploadVideo = () => {
  const [input, setInput] = useState({
    course_id: "",
    video_file: ""
  });
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const [courseList, setCourseList] = useState([]);

  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    const chunk = 3;
    FacultyService.listVideo().then((res) => {
      if (res && res.status === 200) {
        splitIntoChunk(res.data.data, chunk);
      }
    });
  }, []);

  useEffect(() => {
    console.log(materials);
  }, [materials]);

  function splitIntoChunk(arr, chunk) {
    let allChunks = [];
    for (let i = 0; i < arr.length; i += chunk) {
      let chunkArray;
      chunkArray = arr.slice(i, i + chunk);
      allChunks.push(chunkArray);
    }
    setMaterials(allChunks);
  }

  const handleChangeFile = (e) => {
    const { name, value } = e.target;
    if (name === "video_file") {
      setInput((prevState) => ({
        ...prevState,
        [name]: e.target.files[0]
      }));
    } else {
      setInput((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    FacultyService.listCourse().then((res) => {
      if (res && res.data && res.data.data) {
        setCourseList(res.data.data);
      }
    });
  }, []);

  let course_List = [];
  if (courseList) {
    console.log(courseList);
    courseList.forEach((element) => {
      course_List.push(
        <option key={element.id} value={element.id}>
          {element.title}
        </option>
      );
    });
  }

  function submitForm() {
    let { course_id, video_file } = input;
    const formData = new FormData();
    formData.append("file", video_file);
    formData.append("course_id", course_id);
    const data = {
      form_data: formData
    };
    setSpinner(true);
    FacultyService.uploadVideo(data).then((res) => {
      if (res.status == 201) {
        setSpinner(false);
        toast.success("Success: video uploaded successfully");
        router.push("/upload-video");
        // alert("uploaded");
      } else {
        setSpinner(false);
        return toast.error("somethig went wrong");
        // alert(res.error);
      }
    });
  }
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
                <CardMap
                  setDocKey={setDocKey}
                  docKey={docKey}
                  setShowModal={setShowModal}
                  showModal={showModal}
                  materials={props.materials[idx].file_list}
                  cname={courseList.filter((obj) => obj.id === props.materials[idx].course_id)[0].title}
                  indx={idx}
                />
              )}
            </>
          ))}
        {showModal && <GenericModal xl setShowModal={setShowModal} showModal={showModal} header={"Videos"} setDocKey={setDocKey} content={<Content docKey={docKey} setDocKey={setDocKey} />} download={docKey} />}
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
              Course Name: {props.cname} <i className="fas fa-angle-down float-right"></i>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.indx.toString()}>
              <Card.Body>
                <div className="w-100" style={{ display: "flex", flexFlow: "wrap-reverse", flexWrap: "wrap" }}>
                  {props.materials &&
                    props.materials.length > 0 &&
                    props.materials.map((material, idx) => (
                      <Card className="visible recordThumbView w-25" key={"material" + idx}>
                        <img className="card-img-top cursorPointer" src="/assets/images/videothumbnail.svg" onClick={() => handleDocClick(material.Key)} />
                        <Card.Body>
                          <Card.Title className="breakwords">{material.file_name}</Card.Title>
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

  return (
    <>
      {spinner && (
        <FacLayout>
          <ClipLoader />
        </FacLayout>
      )}
      {!spinner && (
        <FacLayout>
          <div className="form-group row">
            <div className="col-sm-9 col-md-9">
              <Form.Group controlId="formFileLg" className="mb-3">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label form-label">Select Course</label>
                  <div className="col-sm-9 col-md-9">
                    <select id="select_course" name="course_id" value={input.course_id} onChange={handleChangeFile} className="form-select">
                      <option value="">Select Course</option>
                      {course_List}
                    </select>
                  </div>
                </div>
                <input onChange={handleChangeFile} type="file" size="lg" name="video_file" />
              </Form.Group>
            </div>
          </div>
          <div className="col-lg-12 mb-4 p-0">
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => {
                submitForm();
              }}
            >
              Submit
            </button>
          </div>
          <section className="features-section-three rel z-1 pt-110 rpt-85 pb-100 rpb-70">
            <div className="container">
              <h5 className="text-center  pb-50">Videos</h5>
              <div className=" ">
                {materials.length === 0 && <label className="col-form-label form-label flex-Just-Center"> Looks like Course Materials list is empty</label>}
                {materials.length > 0 ? (
                  materials.map((uris, index) => {
                    return <CardViewDoc materials={uris} key={"materials" + index} />;
                  })
                ) : (
                  <h3>No videos yet</h3>
                )}
              </div>
            </div>
          </section>
        </FacLayout>
      )}
    </>
  );
};

export default UploadVideo;
