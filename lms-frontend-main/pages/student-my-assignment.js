import { useEffect, useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import Modal from "../src/components/modal/Modal";
import Form from 'react-bootstrap/Form';
import UserService from "./api/user.service";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../pages/api/api"

const initialState = {
    as_id: '',
    as_teacher_id: '',
    as_question: '',
    as_answer: '',
    attach_doc: ''
};

const MyAssignment = () => {
    const [modalToggle, setModalToggle] = useState(false);
    const [assignmentList, setAssignmentList] = useState([]);
    const [assignmentMaterialList, setAssignmentMaterailList] = useState([]);

    const [input, setInput] = useState({
        as_id: '',
        as_teacher_id: '',
        as_question: '',
        as_answer: '',
        attach_doc: '',
        title: ''
    })

    const handleEventModal = () => {
        setModalToggle(true);
    }

    useEffect(() => {
        UserService.getAssignmentList().then(res => {
            setAssignmentList(res.data.data)
        })
        UserService.getAssignmentMaterialList().then(res => {
            if (res && res.status === 200) {
                setAssignmentMaterailList(res.data.data)
            }
        })
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: e.target.files[0]
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { as_id, as_teacher_id, as_answer, attach_doc } = input;
        const assignemntData = {
            assignment: as_id,
            teacher: as_teacher_id,
            answer: as_answer,
            student_assignment_status: 1
        };
        UserService.submitAssignment(assignemntData)
            .then(res => {
                if (res.status === 200) {
                    toast.success("Success: Assignment Submitted");
                    let formData = new FormData();
                    formData.append("file", attach_doc);
                    let file_data = {
                        "assignment_id": as_id,
                        formdata: formData
                    }
                    UserService.uploadStudentAssignemnt(file_data).then(res => {
                        console.log("uploaded res", res)
                    }).catch(err => {
                        console.log('err = ', err)
                    })
                    setModalToggle(false);
                    setInput({ ...initialState });
                    UserService.getAssignmentList().then(res => {
                        setAssignmentList(res.data.data)
                    })
                } else {
                    toast.error(`Error: ${res.response.data.message}`)
                }
            })
            .catch(error => {
                toast.error(`Error: ${error.message}`)
            })
    }
    const downLoadFile = (title) => {
        if (title) {
            let aml = assignmentMaterialList.find(a => a.assignment_name === title)
            if (aml && aml.file_list && aml.file_list.length > 0) {
                const docUrl = api.defaults.baseURL + "material?download&key=" + aml.file_list[0].Key;
                window.open(docUrl)
            }
        }
    }

    const HasMaterial = (title) => {
        if (title) {
            let aml = assignmentMaterialList.find(a => a.assignment_name === title)
            if (aml && aml.file_list && aml.file_list.length > 0) {
                return true
            }
        }
        return false
    }
    return (
        <Layout>
            <PageBanner pageName={"Assignments"} />
            {/* Form Start */}
            <section className="course-left-area py-130 rpy-100">
                <div className="container assignMentModel">
                    <ToastContainer autoClose={2000} />
                    {modalToggle
                        && <Modal
                            title="My Assignment"
                            toggle={modalToggle}
                            onClose={() => { setModalToggle(false); setInput({ ...initialState }); }} >
                            <div className="row m-3">

                                <div className="col-lg-12">
                                    <h4 className="text-center">{input.title}</h4>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <label>Question: </label>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="alert alert-info" role="alert">
                                                {input.as_question}
                                            </div>
                                        </div>
                                    </div>
                                    {HasMaterial(input.title) &&
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>Attachment: </label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="alert alert-info" role="alert">
                                                    Assignment Material Download&nbsp;&nbsp;
                                                    <span onClick={() => { downLoadFile(input.title) }}>
                                                        <i className="fas fa-download cursorPointer" ></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label form-label">Your Answer:</label>
                                            <div className="col-sm-9 col-md-9">
                                                <textarea
                                                    className="form-control"
                                                    id="answer"
                                                    name="answer"
                                                    value={input.as_answer}
                                                    onChange={(e) => setInput({ ...input, as_answer: e.target.value })}
                                                    rows="5"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="course_title" className="col-sm-3 col-form-label form-label">Attach document:</label>
                                            <div className="col-sm-9 col-md-9">
                                                <Form.Group controlId="formFileLg" className="mb-3">
                                                    {/* <Form.Label>Large file input example</Form.Label> */}
                                                    <Form.Control type="file" size="lg" name="attach_doc" onChange={handleChange} />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-0">
                                            <div className="col-sm-9 offset-sm-3">
                                                <button type="submit" className="btn btn-success">Submit Assignment</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Modal>}

                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Assignments</th>
                                    <th scope="col" style={{ width: '70px' }}>Status</th>
                                    <th scope="col">Grade</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            {assignmentList === undefined &&
                                <label className="col-form-label form-label">Looks like assignment list is empty !</label>
                            }
                            <tbody>

                                {
                                    !!assignmentList && (assignmentList.length > 0 &&
                                        assignmentList.map((item, idx) => (
                                            <tr key={item.id}>
                                                <th scope="row">{idx + 1}</th>
                                                <td>{item.title}</td>
                                                <td>
                                                    {
                                                        item.assignment_status ? (
                                                            <div className="alert alert-success" role="alert">
                                                                Completed
                                                            </div>
                                                        ) : (
                                                            <div className="alert alert-warning" role="alert">
                                                                Pending
                                                            </div>
                                                        )
                                                    }
                                                </td>
                                                <td>{item.grade}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-success float-right"
                                                        onClick={() => {
                                                            handleEventModal();
                                                            setInput({
                                                                ...input,
                                                                as_id: item.id,
                                                                as_teacher_id: item.teacher,
                                                                as_question: item.question,
                                                                title: item.title
                                                            });
                                                        }}>View Assignment</button>
                                                </td>
                                            </tr>
                                        )))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            {/* Form End */}
        </Layout>
    )
}

export default MyAssignment;
