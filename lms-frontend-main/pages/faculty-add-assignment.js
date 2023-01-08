import FacLayout from "./faculty";
import { useState, useEffect } from "react";
import FacultyService from './api/faculty.service';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TabLayout from "../src/components/Tabs";
import Form from 'react-bootstrap/Form';
import PaginationTable from "../src/components/PaginationTable";
import Modal from "../src/components/modal/Modal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const initialState = {
    module_id: "",
    question: "",
    assignment_title: "",
    assignment_material: ""
};

const columns = [
    {
        dataField: "slno",
        text: "Sl No",
        sort: true
    },
    {
        dataField: "title",
        text: "Title"
    },
    // {
    //     dataField: "module",
    //     text: "Module"
    // },
    {
        dataField: "question",
        text: "Question"
    },
    {
        dataField: "action",
        text: "Action"
    }

];

function AddAssignment() {
    const [error, setError] = useState("");
    const [moduleList, setModuleList] = useState();
    const [assignmentList, setAssignmentList] = useState([]);
    const [validation, setValidation] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false)
    const [key, setKey] = useState("Add Assignment");

    const [input, setInput] = useState({
        module_id: "",
        question: "",
        assignment_title: "",
        assignment_material: null,
        id: null
    });

    function handleChange(e) {
        e.preventDefault()

        const { name, value } = e.target;

        if (name === "assignment_material") {
            setInput(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        } else {
            setInput(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        // setInput(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }));
    };
    const submitAssignment = e => {
        e.preventDefault()
        let { module_id, question, assignment_title, assignment_material, id } = input;
        let validation_ = false;
        let moule_data = {
            "title": assignment_title,
            "question": question,
            "module": module_id,
            "id": id
        }

        if (!module_id) {
            setError("Assignment Title should not be blank")
            setValidation(true)
            validation_ = true
        } else if (!assignment_title) {
            setError("Assignment description should not be blank")
            setValidation(true)
            validation_ = true
        } else if (!question) {
            setError("Select module should not be blank")
            setValidation(true)
            validation_ = true
        }

        if (isDeleteOpen && isDelete) {
            FacultyService.deleteAssignment(id).then(res => {
                if (res.status == 200) {
                    setError("")
                    toast.success("Success: Quiz question deleted");
                    FacultyService.listAssignment().then(res => {
                        if (res && res.data && res.data.data) {
                            setAssignmentList(res.data.data)
                            setInput({ ...initialState });
                        }
                    })
                } else {
                    setError(res.data.message);
                    setInput({ ...initialState });
                }
            })
                .catch(err => {
                    setError(err);
                });
            setIsDeleteOpen(false)
            return
        }

        if (validation_ == false) {
            if (!isEditOpen && !isDeleteOpen) {
                FacultyService.addAssignment(moule_data).then(res => {
                    if (res.status == 200) {
                        setError("")
                        setInput({ ...initialState });
                        toast.success("Success: Assignment added");
                        let assignmentId = res && res.data && res.data.data;
                        let formData = new FormData();
                        formData.append("file", assignment_material);
                        let file_data = {
                            "assignment_id": assignmentId,
                            formdata: formData
                        }
                        if (assignment_material?.type !== undefined) {
                            FacultyService.uploadAssignemnt(file_data).then(res => {
                                console.log("uploaded res", res)
                            }).catch(err => {
                                console.log('err = ', err)
                            })
                        }

                        FacultyService.listAssignment().then(res => {
                            if (res && res.status === 200) {
                                setAssignmentList(res.data.data)
                            }
                        })
                    } else {
                        if (res && res.data && res.data.message) {
                            setError(res.data.message)
                        }
                    }
                })
                    .catch(err => {
                        setError(err);
                    });
            }
            else if (isEditOpen && !isDeleteOpen) {
                FacultyService.updateAssignment(moule_data, id).then(res => {
                    console.log("updateQuizQuestion", res)
                    if (res.status == 200) {
                        // setError("")
                        toast.success("Success: Quiz question updated");
                        FacultyService.listAssignment().then(res => {
                            if (res && res.data && res.data.data) {
                                setAssignmentList(res.data.data)
                                setInput({ ...initialState });
                            }
                        })
                    } else {
                        setError(res.data.message);
                        setInput({ ...initialState });
                    }
                })
                    .catch(err => {
                        setError(err);
                    });
                setIsEditOpen(false)
            }
        }
    }


    useEffect(() => {
        // Your code here
        FacultyService.listModule().then(res => {
            if (res && res.data) {
                setModuleList(res.data)
            }
        })

        FacultyService.listAssignment().then(res => {
            if (res && res.status === 200) {
                setAssignmentList(res.data.data)
            }
        })
    }, []);



    let module_list_ = [];
    if (moduleList) {
        moduleList.forEach(element => {
            module_list_.push(<option key={element.id} value={element.id}>{element.title}</option>)
        });
    }

    let assignment_list_ = [];
    let action = null;
    if (assignmentList) {
        assignmentList.map((element, idx) => {
            action = <>

                <button onClick={() => { handleEditAssignment(element); }} className="btn btn-default btn-sm float-right">
                    <i className="fas fa-edit"></i> Edit
                </button>
                <button onClick={() => { handleDeleteAssignment(element); }} className="btn btn-default btn-sm float-right">
                    <i className="fas fa-trash"></i> Delete
                </button>
            </>,
                element['action'] = action,
                assignment_list_.push(
                    {
                        slno: idx + 1,
                        title: element.title,
                        // module: element.module,
                        question: element.question,
                        action: element.action
                    }
                )
        });
    }

    function handleEditAssignment(ele) {
        setIsEditOpen(true)
        setError("")
        setInput(
            {
                module_id: ele.module,
                question: ele.question,
                assignment_title: ele.title,
                id: ele.id
            }
        )
    }

    function handleDeleteAssignment(ele) {
        setIsDeleteOpen(true)
        setError("")
        setInput(
            {
                id: ele.id
            }
        )
    }

    return (
        <FacLayout>
            <p className='title-db'>HOME / ASSIGNMENT</p>
            <div className="container">
                <div className="row justify-content-center">
                    <ToastContainer autoClose={2000} />
                    <div className="col-lg-12">
                        <div className="bg-layout wow fadeInUp delay-0-2s" >
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="Add Assignment" title="Add Assignment">
                                    <div className="content">
                                        <span className='err text-center'>{error}</span>
                                        <form onSubmit={submitAssignment} autoComplete="off">
                                            <div className="col-md-12">
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label form-label">Assignment Title:</label>
                                                    <div className="col-sm-4 col-md-4">
                                                        <input id="quiz_title"
                                                            name="assignment_title"
                                                            value={input.assignment_title}
                                                            onChange={handleChange}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Title"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label form-label">Select Module</label>
                                                    <div className="col-sm-4">
                                                        <select
                                                            id="quizId"
                                                            defaultValue=""
                                                            name="module_id"
                                                            value={input.module_id}
                                                            onChange={handleChange}
                                                            className="form-select">
                                                            <option value="">Select Module</option>
                                                            {module_list_}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group ">
                                                    <label>Enter your question</label>
                                                    <textarea className="form-control" id="question"
                                                        name="question"
                                                        value={input.question}
                                                        onChange={handleChange}
                                                        rows="3"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group ">
                                                    <label>Upload Assignment material</label>
                                                    <Form.Group controlId="formFileLg" className="mb-3">
                                                        {/* <Form.Label>Large file input example</Form.Label> */}
                                                        {/* <Form.Control type="file" size="lg" /> */}
                                                        <input onChange={handleChange} type="file" size="lg" name="assignment_material" />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group ">
                                                    <button type="submit" className="btn btn-success">Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Tab>
                                <Tab eventKey='Assignment List' title='Assignment List'>
                                    <ShowList />
                                </Tab>

                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            {isEditOpen &&
                <div className="container assignMentModel">
                    <Modal title="Update Assignment" toggle={isEditOpen} onClose={() => { setIsEditOpen(false); setInput({ ...initialState }); }} style={{ height: 'auto' }}>
                        <div className="content py-3">
                            <span className='err text-center'>{error}</span>
                            <form onSubmit={submitAssignment} autoComplete="off">
                                <div className="col-md-12">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label form-label">Assignment Title:</label>
                                        <div className="col-sm-4 col-md-4">
                                            <input id="quiz_title"
                                                name="assignment_title"
                                                value={input.assignment_title}
                                                onChange={handleChange}
                                                type="text"
                                                className="form-control"
                                                placeholder="Title"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label form-label">Select Module</label>
                                        <div className="col-sm-4">
                                            <select
                                                id="quizId"
                                                defaultValue=""
                                                name="module_id"
                                                value={input.module_id}
                                                onChange={handleChange}
                                                className="form-select">
                                                <option value="">Select Module</option>
                                                {module_list_}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group ">
                                        <label>Enter your question</label>
                                        <textarea className="form-control" id="question"
                                            name="question"
                                            value={input.question}
                                            onChange={handleChange}
                                            rows="3"></textarea>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group ">
                                        <button type="submit" className="btn btn-success">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            }

            {(isDeleteOpen) &&
                <div className="container assignMentModel">
                    <Modal
                        title="Module"
                        toggle={isDeleteOpen}
                        onClose={() => { setIsDeleteOpen(false) }} >
                        <form onSubmit={submitAssignment} autoComplete="off">
                            <div className="row m-3">
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group row mb-0">
                                        <div className="col-sm-6">
                                            <button type="submit" onClick={() => { setIsDelete(true) }} className="btn btn-warning">Delete</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <button type="submit" onClick={() => { setIsDeleteOpen(false) }} className="btn btn-primary">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            }
        </FacLayout>
    )

    function ShowList() {
        return (
            <div className="content">
                {assignmentList.length === 0 &&
                    <label className="col-form-label form-label"> Looks like Assignment list is empty, start adding assignments</label>
                }
                <hr />
                {assignment_list_.length > 0 &&
                    <PaginationTable data={assignment_list_} columns={columns} />
                }
            </div>
        )
    }
}

export default AddAssignment;