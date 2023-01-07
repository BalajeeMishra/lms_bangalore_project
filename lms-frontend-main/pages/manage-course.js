import { useState, useEffect } from "react";
import Modal from "../src/components/modal/Modal";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { v4 as uuid } from "uuid";
import FacultyService from "./api/faculty.service";
import AdminService from "./api/admin.service";

const initialSlotDetails = {
  startDate: "",
  frequency: "",
  Timing: "",
  soldout: false,
  weekendbatch: false
};
const initialModDetails = {
  title: "",
  point1: "",
  point2: "",
  point3: "",
  point4: "",
  point5: "",
  point6: ""
};

function AddCourseDetails(props) {
  const [modModalToggle, setModModalToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteMod, setDeleteMod] = useState(false);
  const [slotsContent, setSlotsContent] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);
  const [slotId, setSlotId] = useState(null);
  const [modId, setModId] = useState(null);
  const [courseCateogeries, setCourseCateogeries] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [slotDetails, setSlotDetails] = useState({
    id: "",
    startDate: "",
    frequency: "",
    Timing1: "",
    Timing2: "",
    soldout: false,
    weekendbatch: false
  });
  const [moduleDetails, setModuleDetails] = useState({
    id: "",
    title: "",
    point1: "",
    point2: "",
    point3: "",
    point4: "",
    point5: "",
    point6: ""
  });

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    batch_name: "",
    image_1: "",
    imageFile: "",
    curriculumFile: "",
    curriculumLink: "",
    para_1: "",
    para_2: "",
    para_3: "",
    target_audience: "",
    time_commitment: "",
    instructor_name: "",
    teacher: "",
    instructor_designation: "",
    instructorImage: "",
    instructor_image: "",
    course_level: "Beginner",
    video_thumb: "",
    duration: "",
    lectures: "",
    subject: "",
    price: "",
    language: "",
    batch: "",
    module: ""
  });
  const [pointsList, setPointsList] = useState({});

  //new useeffect.

  useEffect(() => {
    // Your code here
    FacultyService.getCourseCateogery().then((res) => {
      if (res && res.data && res.data.data) {
        setCourseCateogeries(res.data.data);
      }
    });
    AdminService.getTeachers().then((res) => {
      if (res?.status === 200) {
        setTeachers(res.data.data);
      }
    });
  }, []);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "slot") {
      setSlotDetails((prevState) => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setModuleDetails((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  function addModuleHandle(e) {
    e.preventDefault();
    let sc = moduleContent;
    let id = uuid();
    let { title, point1, point2, point3, point4, point5, point6 } = moduleDetails;
    if (!title || !point1) return;
    let pointsArr = [];
    if (point1) pointsArr.push(point1);
    if (point2) pointsArr.push(point2);
    if (point3) pointsArr.push(point3);
    if (point4) pointsArr.push(point4);
    if (point5) pointsArr.push(point5);
    if (point6) pointsArr.push(point6);
    let s = {
      id: id,
      title: title,
      points: pointsArr
    };
    sc.push(s);
    setModuleContent(sc);
    setModModalToggle(false);
    setModuleDetails({ ...initialModDetails });
    setDeleteMod(false);
  }

  function addSlotHandle(e) {
    e.preventDefault();
    let sc = slotsContent;
    let id = uuid();
    let { startDate, frequency, Timing1, Timing2, soldout, weekendbatch } = slotDetails;
    if (!startDate || !frequency || !Timing1 || !Timing2) return;
    let s = {
      id: id,
      startDate: startDate,
      frequency: frequency,
      Timing1: Timing1,
      Timing2: Timing2,
      soldout: soldout,
      weekendbatch: weekendbatch
    };
    sc.push(s);
    setSlotsContent(sc);
    setModalToggle(false);
    setSlotDetails({ ...initialSlotDetails });
    setShowDelete(false);
  }
  function onclickBadge(item, index) {
    setSlotId(item.id);
    setSlotDetails({ ...item });
    setShowDelete(true);
    setModalToggle(true);
  }
  function onclickBadgeMod(item, index) {
    setModId(item.id);
    let point1 = item?.points[0];
    let point2 = item?.points[1];
    let point3 = item?.points[2];
    let point4 = item?.points[3];
    let point5 = item?.points[4];
    let point6 = item?.points[5];
    setModuleDetails({ ...item, point1, point2, point3, point4, point5, point6 });
    setDeleteMod(true);
    setModModalToggle(true);
  }
  //todo update
  // function updateSlot() {
  //     let upSlotIndx = slotsContent.findIndex(s=> s.id === slotId)
  //     //todo delete needs to implemented
  //     let tempSlot = slotsContent
  //     tempSlot[upSlotIndx] = slotDetails
  //     setSlotsContent(prev=>({
  //         ...prev,
  //         tempSlot
  //     }))
  //     setShowDelete(false)
  //     setModalToggle(false)
  //     setSlotDetails({...initialSlotDetails})
  // }

  function deleteModule() {
    let tempSlots = moduleContent.filter((s) => s.id !== modId);
    //todo delete needs to implemented
    setModuleContent((prev) => tempSlots);
    setDeleteMod(false);
    setModModalToggle(false);
    setModuleDetails({ ...initialModDetails });
  }
  function deleteSlot() {
    let tempSlots = slotsContent.filter((s) => s.id !== slotId);
    //todo delete needs to implemented
    setSlotsContent(tempSlots);
    setShowDelete(false);
    setModalToggle(false);
    setSlotDetails({ ...initialSlotDetails });
  }

  function handleFormBuilder(e, type) {
    const { name, value } = e.target;
    if (type === "img") {
      setCourseDetails((prevState) => ({
        ...prevState,
        [name]: e.target.files[0]
      }));
    } else {
      setCourseDetails((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  const fetchApis = async (file1Data, file2Data, file3Data, cd) => {
    try {
      const res = await Promise.all([AdminService.uploadAssets(file1Data), AdminService.uploadAssets(file2Data), AdminService.uploadAssets(file3Data)]);
      const data = res.map((res) => res.data);
      const status = res.map((res) => res.status);
      cd.image_1 = data[0]?.key;
      cd.curriculum_link = data[1]?.key;
      cd.instructor_image = data[2]?.key;
      console.log(cd);
      AdminService.addCourse(cd).then((res) => {
        if (res?.status === 200) {
          props.cb(res.data.data);
          props.setShowModal(false);
        } else {
          console.error("Failed to add Course Details, Err Msg: ", res);
        }
      });
    } catch {
      throw Error("Promise failed");
    }
  };

  function createCourseDetails(e) {
    e.preventDefault();
    let cd = { ...courseDetails };
    cd.batch = { name: cd.batch_name, slots: slotsContent };
    cd.module = moduleContent;
    let file1Data = new FormData();
    file1Data.append("file", cd.imageFile);
    let file2Data = new FormData();
    file2Data.append("file", cd.curriculumFile);
    let file3Data = new FormData();
    file3Data.append("file", cd.instructorImage);
    fetchApis(file1Data, file2Data, file3Data, cd);
  }

  return (
    <>
      {modalToggle && (
        <div className="slotmodal addCourse">
          <Modal
            title="Slot"
            sm={true}
            toggle={modalToggle}
            onClose={() => {
              setModalToggle(false);
              setSlotDetails({ ...initialSlotDetails });
              setShowDelete(false);
            }}
          >
            <div className="row m-3">
              <form name="slot" onSubmit={(e) => addSlotHandle(e)} autoComplete="off" className="w-100">
                <div className="w-100">
                  <Form.Group as={Row} controlId="formPlaintextSd">
                    <Form.Label column sm="4">
                      Start Date
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control required onChange={(e) => handleChange(e, "slot")} name="startDate" type="date" value={slotDetails.startDate} placeholder="Start Date" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextFreq">
                    <Form.Label column sm="4">
                      Frequency
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control required onChange={(e) => handleChange(e, "slot")} name="frequency" type="text" value={slotDetails.frequency} placeholder="Start day - End day (No.of days)" />
                      <span style={{ fontSize: "10px", fontWeight: "700" }}>Hint: Mon - Fri (18Days)</span>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintexttime">
                    <Form.Label column sm="4">
                      Timings
                    </Form.Label>
                    <Col sm="4">
                      <Form.Control required onChange={(e) => handleChange(e, "slot")} name="Timing1" type="time" value={slotDetails.Timing1} placeholder="Timings" />
                    </Col>
                    <Col sm="4">
                      <Form.Control required onChange={(e) => handleChange(e, "slot")} name="Timing2" type="time" value={slotDetails.Timing2} placeholder="Timings" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextso">
                    <Form.Label column sm="4">
                      Soldout
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control required onChange={(e) => handleChange(e, "slot")} name="soldout" value={slotDetails.soldout} as="select">
                        <option>No</option>
                        <option>Yes</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextWb">
                    <Form.Label column sm="4">
                      Weekend Batch
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control required onChange={(e) => handleChange(e, "slot")} name="weekendbatch" as="select" value={slotDetails.weekendbatch}>
                        <option>No</option>
                        <option>Yes</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  {!showDelete && <Button type="submit"> Add </Button>}
                  {/* {showDelete && <Button className="m-2" onClick={() => updateSlot()}> Update </Button>} */}
                  {showDelete && (
                    <Button className="m-2" onClick={() => deleteSlot()}>
                      {" "}
                      Delete{" "}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </Modal>
        </div>
      )}

      {modModalToggle && (
        <div className="addCourse slotmodal">
          <Modal
            title="Module"
            sm={true}
            toggle={modModalToggle}
            onClose={() => {
              setModModalToggle(false);
              setModuleDetails({ ...initialModDetails });
              setDeleteMod(false);
            }}
          >
            <div className="row m-3">
              <form name="module" onSubmit={(e) => addModuleHandle(e)} autoComplete="off" className="w-100">
                <div className="w-100">
                  <Form.Group as={Row} controlId="formPlaintextModTitle">
                    <Form.Label column sm="4">
                      Title
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control required onChange={(e) => handleChange(e, "module")} name="title" type="text" value={moduleDetails.title} placeholder="Module Title" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextFreq">
                    <Form.Label column sm="4">
                      Points
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control required onChange={(e) => handleChange(e, "module")} name="point1" value={moduleDetails.point1} type="text" placeholder="Add points/details" />
                      <Form.Control onChange={(e) => handleChange(e, "module")} name="point2" value={moduleDetails.point2} type="text" placeholder="Add points/details" />
                      <Form.Control onChange={(e) => handleChange(e, "module")} name="point3" value={moduleDetails.point3} type="text" placeholder="Add points/details" />
                      <Form.Control onChange={(e) => handleChange(e, "module")} name="point4" value={moduleDetails.point4} type="text" placeholder="Add points/details" />
                      <Form.Control onChange={(e) => handleChange(e, "module")} name="point5" value={moduleDetails.point5} type="text" placeholder="Add points/details" />
                      <Form.Control onChange={(e) => handleChange(e, "module")} name="point6" value={moduleDetails.point6} type="text" placeholder="Add points/details" />
                    </Col>
                  </Form.Group>

                  {!deleteMod && <Button type="submit"> Add </Button>}
                  {/* {deleteMod && <Button className="m-2" onClick={() => updateSlot()}> Update </Button>} */}
                  {deleteMod && (
                    <Button className="m-2" onClick={() => deleteModule()}>
                      {" "}
                      Delete{" "}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </Modal>
        </div>
      )}
      <h4>Add Course Details</h4>
      <div className="addCourse container">
        <div className="col-md-12">
          <Form onSubmit={(e) => createCourseDetails(e)}>
            <Form.Group as={Row} controlId="formPlaintextCC">
              <Form.Label column sm="2">
                Course Category
              </Form.Label>
              <Col sm="5">
                <Form.Control required as="select" name="category" onChange={(e) => handleFormBuilder(e)}>
                  <option value="">Select Course Category</option>
                  {courseCateogeries.length > 0 &&
                    courseCateogeries.map((element) => {
                      return (
                        <option key={element.id} value={element.id}>
                          {element.title}
                        </option>
                      );
                    })}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintexthead">
              <Form.Label column sm="2">
                Title
              </Form.Label>
              <Col sm="5">
                <Form.Control name="title" type="text" required placeholder="Title of Course" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextBN">
              <Form.Label column sm="2">
                Batch Name
              </Form.Label>
              <Col sm="5">
                <Form.Control name="batch_name" type="text" placeholder="Batch Name" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Add Solt/s
              </Form.Label>
              <Col sm="5">
                {/* start date  frequesncy timing soldout weekend */}
                <Button
                  onClick={() => {
                    setDeleteMod(false);
                    setModalToggle(true);
                  }}
                >
                  Add Slot
                </Button>
                {slotsContent.map((element, index) => {
                  return (
                    <Badge
                      key={"manage_course_" + index}
                      onClick={() => {
                        onclickBadge(element, index);
                      }}
                      className="m-2 p-2"
                      variant="primary"
                    >
                      {"Slot " + (index + 1)}
                    </Badge>
                  );
                })}
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextBi">
              <Form.Label column sm="2">
                Banner Image
              </Form.Label>
              <Col sm="5">
                <Form.File className="position-relative" required name="imageFile" onChange={(e) => handleFormBuilder(e, "img")} feedbackTooltip />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextCD">
              <Form.Label column sm="2">
                Curriculum Document
              </Form.Label>
              <Col sm="5">
                <Form.File className="position-relative" required name="curriculumFile" onChange={(e) => handleFormBuilder(e, "img")} feedbackTooltip />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextC1">
              <Form.Label column sm="2">
                Content 1
              </Form.Label>
              <Col sm="5">
                <Form.Control required type="text" name="para_1" placeholder="Add Content 1" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextC2">
              <Form.Label column sm="2">
                Content 2
              </Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="para_2" placeholder="Add Content 2" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextC3">
              <Form.Label column sm="2">
                Content 3
              </Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="para_3" placeholder="Add Content 3" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextta">
              <Form.Label column sm="2">
                Target Audience
              </Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="target_audience" placeholder="Target Audience" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintexttyc">
              <Form.Label column sm="2">
                Target Commitment
              </Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="time_commitment" placeholder="Target Commitment" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextmoddetails">
              <Form.Label column sm="2">
                Modules
              </Form.Label>
              <Col sm="5">
                {/* start date  frequesncy timing soldout weekend */}
                <Button
                  onClick={() => {
                    setModModalToggle(true);
                  }}
                >
                  Add Module
                </Button>

                {moduleContent.map((element, index) => {
                  return (
                    <Badge
                      key={"manage_course_add" + index}
                      onClick={() => {
                        onclickBadgeMod(element, index);
                      }}
                      className="m-2 p-2"
                      variant="primary"
                    >
                      {"Module " + (index + 1)}
                    </Badge>
                  );
                })}
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextinst">
              <Form.Label column sm="2">
                Instructor Name
              </Form.Label>
              <Col sm="5">
                <Form.Control required as="select" name="teacher" onChange={(e) => handleFormBuilder(e)}>
                  <option value="">Select Teacher</option>
                  {teachers.length > 0 &&
                    teachers.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.user.first_name} {e.user.last_name}
                        </option>
                      );
                    })}
                </Form.Control>
              </Col>
            </Form.Group>

            {/* <Form.Group as={Row} controlId="formPlaintextinst">
              <Form.Label column sm="2"></Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="instructor_name" placeholder="Instructor Name" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group> */}

            <Form.Group as={Row} controlId="formPlaintextinst">
              <Form.Label column sm="2">
                Instructor Designation
              </Form.Label>
              <Col sm="5">
                <Form.Control type="text" name="instructor_designation" placeholder="Instructor Designation" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextinst">
              <Form.Label column sm="2">
                Instructor Profile Picture
              </Form.Label>
              <Col sm="5">
                <Form.File className="position-relative" required name="instructorImage" onChange={(e) => handleFormBuilder(e, "img")} feedbackTooltip />
              </Col>
            </Form.Group>
            {/* <Form.Group as={Row} controlId="formPlaintextthumb">
                            <Form.Label column sm="2">
                                Video Thumbnail/url
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="text" name="video_thumb" placeholder="Video Thumbnail/url" onChange={(e)=> handleFormBuilder(e)}/>
                            </Col>
                        </Form.Group> */}
            <Form.Group as={Row} controlId="formPlaintextCP">
              <Form.Label column sm="2">
                Course Price
              </Form.Label>
              <Col sm="5">
                <Form.Control required name="price" type="text" placeholder="Course Price" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextCl">
              <Form.Label column sm="2">
                Course Level
              </Form.Label>
              <Col sm="5">
                <Form.Control required as="select" name="course_level" onChange={(e) => handleFormBuilder(e)}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextDC">
              <Form.Label column sm="2">
                Duration of Course
              </Form.Label>
              <Col sm="5">
                <Form.Control required name="duration" type="text" placeholder="Duration of Course" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextlecs">
              <Form.Label column sm="2">
                Lectures
              </Form.Label>
              <Col sm="5">
                <Form.Control required name="lectures" type="text" placeholder="Total Lectures of Course" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextSub">
              <Form.Label column sm="2">
                Subject
              </Form.Label>
              <Col sm="5">
                <Form.Control name="subject" type="text" placeholder="Subject of Course" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextlang">
              <Form.Label column sm="2">
                Language
              </Form.Label>
              <Col sm="5">
                <Form.Control name="language" type="text" placeholder="Language" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintexttiw">
              <Form.Label column sm="2">
                Twitter
              </Form.Label>
              <Col sm="5">
                <Form.Control name="twitter" type="text" placeholder="Twitter profile link" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextfb">
              <Form.Label column sm="2">
                FaceBook
              </Form.Label>
              <Col sm="5">
                <Form.Control name="facebook" type="text" placeholder="FaceBook profile link" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextinsta">
              <Form.Label column sm="2">
                Instagram
              </Form.Label>
              <Col sm="5">
                <Form.Control name="instagram" type="text" placeholder="Instagram Profile link" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPin">
              <Form.Label column sm="2">
                Pinterest
              </Form.Label>
              <Col sm="5">
                <Form.Control name="pinterst" type="text" placeholder="Pinterest profile link" onChange={(e) => handleFormBuilder(e)} />
              </Col>
            </Form.Group>
            <Button type="submit">Add Course Details</Button>
          </Form>
        </div>
      </div>
    </>
  );
}
export default AddCourseDetails;
