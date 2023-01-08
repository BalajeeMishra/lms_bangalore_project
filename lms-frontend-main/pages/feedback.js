import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import StudentService from "./api/student.service";
import AdminService from "./api/admin.service";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/components/PageBanner";

function FeedBack() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    course_name: "",
    batch_name: "",
    detail: ""
  });

  const [course, setCourse] = useState([]);

  const fn = async () => {
    const response = await AdminService.listCourseDetails();
    setCourse(response.data.data);
  };

  useEffect(() => {
    fn();
  }, []);

  const handleFormBuilder = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const feedbackFormDetails = async (e) => {
    e.preventDefault();
    const response = await StudentService.createfeedback(input);
    console.log(input, "balajee", response);
  };

  return (
    <>
      <Layout>
        <PageBanner pageName={"feedback"} />
        <div className="text-center mt-3 align-center" style={{ width: "60%", margin: "auto" }}>
          <div className="">
            <h4>FeedBack Form</h4>

            <Form onSubmit={(e) => feedbackFormDetails(e)} className="text-center">
              <Form.Group as={Row} controlId="formPlaintexthead">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="5">
                  <Form.Control name="name" type="text" required placeholder="Name" onChange={(e) => handleFormBuilder(e)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintexthead">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="5">
                  <Form.Control name="email" type="email" required placeholder="Email" onChange={(e) => handleFormBuilder(e)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintexthead">
                <Form.Label column sm="2">
                  Mobile No.
                </Form.Label>
                <Col sm="5">
                  <Form.Control name="mobile" type="text" required placeholder="Mobile No" onChange={(e) => handleFormBuilder(e)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextBN">
                <Form.Label column sm="2">
                  Select Course Name
                </Form.Label>
                <Col sm="5">
                  <Form.Control as="select" name="course_name" onChange={(e) => handleFormBuilder(e)}>
                    {course.length >= 0 && (
                      <>
                        {course.map((e) => (
                          <option value={e.course.id}>{e.course.title}</option>
                        ))}
                      </>
                    )}
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextinst">
                <Form.Label column sm="2">
                  Batch Name
                </Form.Label>
                <Col sm="5">
                  <Form.Control type="text" name="batch_name" placeholder="Batch Name" onChange={(e) => handleFormBuilder(e)} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextCP">
                <Form.Label column sm="2">
                  write in (detail)
                </Form.Label>
                <Col sm="5">
                  <Form.Control required name="detail" type="text" placeholder="Detail" as="textarea" rows={5} onChange={(e) => handleFormBuilder(e)} />
                </Col>
              </Form.Group>

              <Button type="submit" className="mb-3">
                submit feedback
              </Button>
            </Form>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default FeedBack;
