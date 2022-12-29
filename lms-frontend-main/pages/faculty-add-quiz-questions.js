import { useState, useEffect } from "react"
import FacLayout from "./faculty";
import FacultyService from './api/faculty.service';
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TabLayout from "../src/components/Tabs";
import PaginationTable from "../src/components/PaginationTable";
import Modal from "../src/components/modal/Modal";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const columns = [
    {
        dataField: "quiz",
        text: "Quiz",
        sort: true
    },
    {
        dataField: "questions",
        text: "Questions"
    },
    {
        dataField: "ans1",
        text: "Answer 1"
    },
    {
        dataField: "ans2",
        text: "Answer 2"
    },
    {
        dataField: "ans3",
        text: "Answer 3"
    },
    {
        dataField: "ans4",
        text: "Answer 4"
    },
    {
        dataField: "right_ans",
        text: "Right answer"
    },
    {
        // events: {
        //     onClick: (e, column, columnIndex, row, rowIndex) => {},
        //   },
        dataField: "action",
        text: "Action"
    }
];

const initialValues = {
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    question: "",
    quiz_type: "",
    right_ans: "",
    id: null
}
const AddQuizQuestions = () => {
    const [key, setKey] = useState('Add Questions');
    const [quizeList, setQuizeList] = useState([]);
    const [quizeListQue, setQuizeListQue] = useState([]);
    const [error, setError] = useState("");
    const [validation, setValidation] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false)

    const [inputFields, setInputFields] = useState({
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        question: "",
        quiz_type: "",
        right_ans: "",
        id: null
    });

    const [editValue, setEditValue] = useState()
    
    const handleChange = e => {
        const { name, value } = e.target;
        setInputFields(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        // Your code here
        FacultyService.listQuiz().then(res => {
            if(res&&res.status === 200){
                if (res && res.data && res.data.data) {
                setQuizeList(res.data.data)
                }
            }
        })

        FacultyService.listQuizQuestion().then(res =>{
            if (res && res.data && res.data.data) {
            setQuizeListQue(res.data.data)
            }
        }) 
    }, []);


    let quiz_list_ = [];
    if (quizeList) {
        quizeList.forEach(element => {
            quiz_list_.push(<option key={element.id} value={element.id}>{element.title}</option>)
        });
    };

    let quiz_list_que_ = [];
    if(quizeListQue.length > 0 ) {
        quizeListQue.map((item, idx) => {
            console.log('questionlistque ',item)
            if(Object.keys(item).length > 0){
                let obj = Object.keys(item);
                let action = null;
                console.log("item", item)
                let allQues = item[obj]
                let filteredQues = allQues.filter(a=>a.is_deleted !== true)
                filteredQues.map(ele => (
                    action = <>
                   
                    <button onClick={()=>{ handleEditQuizQuestion(ele);}} className="btn btn-default btn-sm float-right">
                    <i className="fas fa-edit"></i> Edit 
                    </button>
                    <button onClick={()=>{ handleDeleteQuizQuestion(ele);}} className="btn btn-default btn-sm float-right">
                    <i className="fas fa-trash"></i> Delete 
                    </button>
                    </>,
                    ele['action'] = action,
                    quiz_list_que_.push(ele)
                ))
            }
        })
    }

    function handleEditQuizQuestion(ele) {
        setIsEditOpen(true)
        setInputFields(
            {
                answer1: ele.ans1,
                answer2: ele.ans2,
                answer3: ele.ans3,
                answer4: ele.ans4,
                question: ele.questions,
                quiz_type: ele.quiz,
                right_ans: ele.right_ans,
                id: ele.id
            }
        )
    }

    function handleDeleteQuizQuestion(ele) {
        setIsDeleteOpen(true)
        setInputFields(
            {
                id: ele.id
            }
        )
    }

    const submitQuizQuestion = e => {
        e.preventDefault()
        let { answer1, answer2, answer3, answer4, question, quiz_type, right_ans, id } = inputFields;
        let validation_ = false;
        let quiz_data = {
            "right_ans": right_ans,
            "ans1": answer1,
            "ans2": answer2,
            "ans3": answer3,
            "ans4": answer4,
            "questions": question,
            "quiz_id": quiz_type
        }

        

        if (!answer1) {
            setError("answer1 title should not be empty");
            setValidation(true);
            validation_ = true;
        } else if (!answer2) {
            setError("course option should not be empty");
            setValidation(true);
            validation_ = true
        } else if (!answer3) {
            setError("detail should not be empty");
            setValidation(true);
            validation_ = true;
        }
        else if (!answer4) {
            setError("detail should not be empty");
            setValidation(true);
            validation_ = true;
        }
        else if (!question) {
            setError("detail should not be empty");
            setValidation(true);
            validation_ = true;
        }
        else if (!right_ans) {
            setError("detail should not be empty");
            setValidation(true);
            validation_ = true;
        }
        else if (!quiz_type) {
            setError("detail should not be empty");
            setValidation(true);
            validation_ = true;
        }
        if (isDeleteOpen && isDelete) {
            FacultyService.deleteQuizQuestion(id).then(res => {
                console.log("res",res)
                if (res.status == 200) {
                    setError("")
                    setInputFields({...initialValues})
                    toast.success("Success: Quiz question deleted");
                    FacultyService.listQuizQuestion().then(res =>{
                        if (res && res.data && res.data.data) {
                        console.log("res", res)
                        setQuizeListQue(res.data.data)
                        }
                    }) 
                } else {
                    setError(res.data.message);
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
                console.log("i am firsty")
                FacultyService.addQuizQuestion(quiz_data).then(res => {
                    // console.log("res",res)
                    if (res.status == 200) {
                        setError("")
                        setInputFields({...initialValues})
                        toast.success("Success: Quiz question added");
                        FacultyService.listQuizQuestion().then(res =>{
                            if (res && res.data && res.data.data) {
                            setQuizeListQue(res.data.data)
                            }
                        }) 
                    } else {
                        setError(res.data.message);
                    }
                })
                .catch(err => {
                    setError(err);
                });
            } else if (isEditOpen  && !isDeleteOpen) {
                FacultyService.updateQuizQuestion(quiz_data, id).then(res => {
                    console.log("updateQuizQuestion",res)
                    if (res.status == 200) {
                        setError("")
                        setInputFields({...initialValues})
                        toast.success("Success: Quiz question updated");
                        FacultyService.listQuizQuestion().then(res =>{
                            if (res && res.data && res.data.data) {
                            setQuizeListQue(res.data.data)
                            }
                        }) 
                    } else {
                        setError(res.data.message);
                    }
                })
                .catch(err => {
                    setError(err);
                });
                setIsEditOpen(false)
            }
        }
    }

    return (
        <FacLayout>
            <p className='title-db'>HOME / QUIZ</p>
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
                                <Tab eventKey={'Add Questions'} title={'Add Questions'}>
                                    <div className="content">
                                        <span className='err text-center'>{error}</span>
                                        <form onSubmit={submitQuizQuestion} autoComplete="off">
                                            <div className="col-md-12">
                                                <div className="form-group row">
                                                    <label className="col-sm-2 col-form-label form-label">Select</label>
                                                    <div className="col-sm-3">
                                                        <select
                                                            id="quizId"
                                                            name="quiz_type"
                                                            onChange={handleChange}
                                                            value={inputFields.quiz_type}
                                                            className="form-select">
                                                            <option value="">Select Quiz</option>
                                                            {quiz_list_}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group ">
                                                    <label>Enter your question</label>
                                                    <textarea className="form-control" id="question" onChange={handleChange} value={inputFields.question} name="question" rows="3"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Add answers</label>
                                                    <div className="row my-3">
                                                        <div className="col" >
                                                            <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                                                <input type="checkbox" aria-label="correct" />
                                                                <input type="text" onChange={handleChange} value={inputFields.answer1} name="answer1" className="form-control" placeholder="Answer" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Add answers</label>
                                                    <div className="row my-3">
                                                        <div className="col" >
                                                            <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                                                <input type="checkbox" aria-label="correct" />
                                                                <input type="text" onChange={handleChange} value={inputFields.answer2} name="answer2" className="form-control" placeholder="Answer" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Add answers</label>
                                                    <div className="row my-3">
                                                        <div className="col" >
                                                            <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                                                <input type="checkbox" aria-label="correct" />
                                                                <input type="text" onChange={handleChange} value={inputFields.answer3} name="answer3" className="form-control" placeholder="Answer" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Add answers</label>
                                                    <div className="row my-3">
                                                        <div className="col" >
                                                            <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                                                <input type="checkbox" aria-label="correct" />
                                                                <input type="text" onChange={handleChange} value={inputFields.answer4} name="answer4" className="form-control" placeholder="Answer" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Right answer</label>
                                                    <div className="row my-3">
                                                        <div className="col" >
                                                            <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                                                {/* <input type="checkbox" aria-label="correct"/> */}
                                                                <input type="text" onChange={handleChange} value={inputFields.right_ans} name="right_ans" className="form-control" placeholder="Answer" />
                                                            </div>
                                                        </div>
                                                    </div>
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
                                <Tab eventKey={'Questions List'} title={'Questions List'}>
                                    <QuestionList />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            
            {isEditOpen &&
            <div className="container assignMentModel">
            <Modal title="Update Quiz Questions" toggle={isEditOpen} onClose={() => { setIsEditOpen(false); setInputFields({...initialValues})}} style={{height: 'auto'}}>
                <div className="content py-3">
                    <span className='err text-center'>{error}</span>
                    <form onSubmit={submitQuizQuestion} autoComplete="off">
                        <div className="col-md-12">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label form-label">Select</label>
                                <div>
                                    <select
                                        id="quizId"
                                        name="quiz_type"
                                        onChange={handleChange}
                                        defaultValue={inputFields.quiz_type}
                                        value={inputFields.quiz_type}
                                        className="form-select">
                                        <option value="">Select Quiz</option>
                                        {quiz_list_}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group ">
                                <label>Enter your question</label>
                                <textarea className="form-control" id="question" onChange={handleChange} value={inputFields.question} name="question" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Add answers</label>
                                <div className="row my-3">
                                    <div className="col" >
                                        <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                            <input type="checkbox" aria-label="correct" />
                                            <input type="text" onChange={handleChange} defaultValue={inputFields.answer1} value={inputFields.answer1} name="answer1" className="form-control" placeholder="Answer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Add answers</label>
                                <div className="row my-3">
                                    <div className="col" >
                                        <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                            <input type="checkbox" aria-label="correct" />
                                            <input type="text" onChange={handleChange} value={inputFields.answer2} name="answer2" className="form-control" placeholder="Answer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Add answers</label>
                                <div className="row my-3">
                                    <div className="col" >
                                        <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                            <input type="checkbox" aria-label="correct" />
                                            <input type="text" onChange={handleChange} value={inputFields.answer3} name="answer3" className="form-control" placeholder="Answer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Add answers</label>
                                <div className="row my-3">
                                    <div className="col" >
                                        <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                            <input type="checkbox" aria-label="correct" />
                                            <input type="text" onChange={handleChange} value={inputFields.answer4} name="answer4" className="form-control" placeholder="Answer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Right answer</label>
                                <div className="row my-3">
                                    <div className="col" >
                                        <div className="form-group" style={{ marginBottom: '0px', display: 'flex' }}>
                                            {/* <input type="checkbox" aria-label="correct"/> */}
                                            <input type="text" onChange={handleChange} value={inputFields.right_ans} name="right_ans" className="form-control" placeholder="Answer" />
                                        </div>
                                    </div>
                                </div>
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
                <form onSubmit={submitQuizQuestion} autoComplete="off">
                    <div className="row m-3">
                        <div className="col-lg-12 col-md-12">
                            <div className="form-group row mb-0">
                                <div className="col-sm-6">
                                    <button type="submit" onClick={() => {setIsDelete(true)}} className="btn btn-warning">Delete</button>
                                </div>
                                <div className="col-sm-6">
                                    <button type="submit" onClick={() => {setIsDeleteOpen(false)}} className="btn btn-primary">Cancel</button>
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

    function QuestionList() {
        return (
            <div className="content">
            {quiz_list_que_.length === 0 &&
                <label className="col-form-label form-label"> Looks like Questions list is empty, start adding questions</label>
            }
            {quiz_list_que_.length > 0 && 
               <PaginationTable  data={quiz_list_que_} columns={columns} />
            }
        </div>
        )
    }
}
export default AddQuizQuestions;