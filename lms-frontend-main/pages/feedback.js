import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import StudentService from "./api/student.service";
import AdminService from "./api/admin.service";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/components/PageBanner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function FeedBack() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    batch_name: "",
    detail: ""
  });

  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const fn = async () => {
    const response = await AdminService.listCourseDetails();
    setCourses(response.data.data);
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

    if (response.status == 200) {
      toast.success("Feedback submitted successfully, we will back to you soon");
      setTimeout(() => {
        return router.push("/");
      }, [1000]);
    } else {
      return toast.error("something went wrong, Please try again");
    }
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
                  <Form.Control name="mobile" type="tel" required placeholder="Mobile No" onChange={(e) => handleFormBuilder(e)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextBN">
                <Form.Label column sm="2">
                  Select Course Name
                </Form.Label>
                <Col sm="5">
                  <Form.Control as="select" name="course" onChange={(e) => handleFormBuilder(e)}>
                    <option key="default" value="">
                      Select Course Name
                    </option>
                    {courses.length >= 0 && (
                      <>
                        {courses.map(({ id, title, course }, idx) => (
                          <option key={idx} value={course.id}>
                            {title}
                          </option>
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
        <ToastContainer autoClose={1500} />
      </Layout>
    </>
  );
}
export default FeedBack;
