import FacLayout from "./faculty";
import { useState, useEffect } from "react";
import Modal from "../src/components/modal/Modal";
import FacultyService from './api/faculty.service';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    quiz_title: "",
    quiz_cateogery: "",
    detail: ""      
};

const AddQuiz = () => {


    const [modalToggle, setModalToggle] = useState(false);

    const [input, setInput] = useState({
        quiz_title: "",
        quiz_cateogery: "",
        detail: "",
    });
    const [error, setError] = useState("");
    const [courseList, setCourseList] = useState();
    const [quizeList, setQuizeList] = useState();
    const [courseCateogery, setCourseCateogery] = useState();
    const [validation, setValidation] = useState(false);

    const [isupdate, setIsupdate] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleEventModal = () => {
        setInput({...initialState})
        setModalToggle(true);
        setIsupdate(false)
    }

    useEffect(() => {
        // Your code here
        FacultyService.listQuiz().then(res =>{
            if (res && res.data && res.data.data) {
            setQuizeList(res?.data?.data)
            }
        }) 

        FacultyService.listCourse().then(res =>{
            if (res && res.data && res.data.data) {
            setCourseList(res?.data?.data)
            }
        }) 
    }, []);

    const handleChange = e => {
        const {name, value} = e.target;
        setInput(prevState => ({
          ...prevState,
          [name] : value
        }));
    };

    const submitQuiz = e => {
        e.preventDefault()
        let {quiz_title, quiz_cateogery, detail, id} = input
        let validation_ = false
        let quiz_data = {
            "title":quiz_title,
            "course_id":quiz_cateogery,
            "detail":detail
        }

        if (quiz_title == ""){
            setError("quiz title should not be empty")
            setValidation(true)
            validation_ = true
        } else if (quiz_cateogery == "") {
            setError("course option should not be empty")
            setValidation(true)
            validation_ = true
        }else if (detail == "") {
            setError("detail should not be empty")
            setValidation(true)
            validation_ = true
        }

        if(validation_ == false){
            
            if (!isupdate && !isDelete) {
                FacultyService.addQuiz(quiz_data).then(res => {
                    if (res.status == 200){
                        setError("")
                        setModalToggle(false)
                        setInput({ ...initialState });
                        toast.success("Success: Quiz added");
                        FacultyService.listQuiz().then(res =>{
                            if (res && res.data && res.data.data) {
                                setQuizeList(res.data.data)
                            }
                        })
                    }else{
                        setError(res?.data?.message)
                    }
                })
                .catch(err => {
                    setError(err)            
                })
            } else if (isupdate) {
                FacultyService.updateQuiz(quiz_data, id).then(res => {
                    if (res.status == 200){
                        setError("")
                        setModalToggle(false)
                        setInput({ ...initialState });
                        toast.success("Success: Quiz Updated");
                        FacultyService.listQuiz().then(res =>{
                            if (res && res.data && res.data.data) {
                                setQuizeList(res.data.data)
                            }
                        })
                    }else{
                        setError(res?.data?.message)
                    }
                })
                .catch(err => {
                    setError(err)            
                })
                setIsupdate(false)
            } else if (isDelete) {
                FacultyService.deleteQuiz(id).then(res => {
                    if (res.status == 200){
                        setError("")
                        setModalToggle(false)
                        setDeleteToggle(false)
                        setInput({ ...initialState });
                        toast.success("Success: Quiz updated");
                        FacultyService.listQuiz().then(res =>{
                            if (res && res.data && res.data.data) {
                                setQuizeList(res.data.data)
                            } else {
                                setQuizeList([])
                            }
                        })
                    }else{
                        setError(res.data.message)
                    }
                })
                .catch(err => {
                    setError(err)            
                })
                setIsDelete(false)
            }

        }         
    }

    let course_list_ = []
    if (courseList){
        courseList.forEach(element => {
            course_list_.push(<option value={element.id}>{element.title}</option>)        
     });
    }  
    

    function handleEditQuiz(element){
        const editState = {
            quiz_title: element?.title,
            quiz_cateogery: element?.cateogery,
            detail: element?.detail,
            id: element?.id
        };
        setInput({...editState})
        setModalToggle(true);
        setIsupdate(true)
    }

    function handleDeleteQuiz(element) {
        const deleteState = {
            id: element?.id
        };
        setInput({...deleteState})
        setDeleteToggle(true);
    }

    let quizeList_ = []
    if(quizeList){
        quizeList.forEach((element, index) => {
            quizeList_.push(
                <div className="card card-sm" key={element.title+'_'+index}>
                <div className="card-body media">
                    <div className="media-left">
                        <a rel="noopener noreferrer"  href="#" className="avatar avatar-lg avatar-4by3">
                            <img src="/assets/images/courses/quiz.jpg" alt="Card image cap" className="avatar-img rounded"/>
                        </a>
                    </div>
                    <div className="media-body">
                        <h4 className="card-title mb-0"><a rel="noopener noreferrer"  href="#">{element.title}</a></h4>
                        <small className="text-muted">{element.detail}</small>
                    </div>
                </div>
                <div className="card-footer text-center">
                <button onClick={()=>{ handleEditQuiz(element);}} className="btn btn-default btn-sm float-right">
                    <i className="fas fa-edit"></i> Edit 
                    </button>
                    <button onClick={()=>{ handleDeleteQuiz(element);}} className="btn btn-default btn-sm float-right">
                    <i className="fas fa-trash"></i> Delete 
                    </button>
                    <div className="clearfix"></div>
                </div>
            </div>
            )
        })
    }

  return (
    <FacLayout>
        <p className='title-db'>HOME / QUIZ</p>
        <div className="container assignMentModel">
                {modalToggle 
                && <Modal 
                    title="Quiz"
                    toggle={modalToggle} 
                    onClose={() => {setModalToggle(false)}} >
                    <div className="row m-3">
                        <div className="col-lg-10">
                        <span className='err text-center'>{error}</span>    
                            <form onSubmit={submitQuiz} autoComplete="off">
                                <div className="form-group row">
                                    <label htmlFor="quiz_title" className="col-sm-3 col-form-label form-label">Quiz Title:</label>
                                    <div className="col-sm-9 col-md-9">
                                        <input id="quiz_title" 
                                        type="text" 
                                        name="quiz_title" 
                                        value={input.quiz_title}
                                        onChange={handleChange}
                                        className="form-control" placeholder="Title" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="course_title" className="col-sm-3 col-form-label form-label">Module:</label>
                                    <div className="col-sm-9 col-md-9">
                                        <select 
                                            id="course_title" 
                                            name="quiz_cateogery" 
                                            value={input.quiz_cateogery}
                                            onChange={handleChange}
                                            className="form-select">
                                            <option value="">Select Module</option>
                                            {course_list_}
                                        </select>
                                    </div>
                                </div>

                                {/* <div className="form-group row">
                                    <label htmlFor="quiz_image" className="col-sm-3 col-form-label form-label">Quiz Image:</label>
                                    <div className="col-sm-9 col-md-9">
                                        <p><img src="assets/images/vuejs.png" alt="" width="150" className="rounded"/></p>
                                        <div className="custom-file">
                                            <input type="file" id="quiz_image" className="custom-file-input"/>
                                            <label htmlFor="quiz_image" className="custom-file-label">Choose file</label>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="form-group row">
                                    <label htmlFor="quiz_desc" className="col-sm-3 col-form-label form-label">Details:</label>
                                    <div className="col-sm-9 col-md-9">
                                        <textarea 
                                        className="form-control" 
                                        id="detail" 
                                        name="detail"
                                        value={input.detail}
                                        onChange={handleChange}
                                        rows="2"></textarea>
                                    </div>
                                </div>
                                
                                <div className="form-group row mb-0">
                                    <div className="col-sm-9 offset-sm-3">
                                        <button type="submit" className="btn btn-success" >Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div> 
                </Modal>}

                {deleteToggle && 
                <Modal
                title="Quiz"
                toggle={deleteToggle}
                onClose={() => { setDeleteToggle(false) }} >
                    <form onSubmit={submitQuiz} autoComplete="off">
                        <div className="row m-3">
                            <div className="col-lg-12 col-md-12">
                                <div className="form-group row mb-0">
                                    <div className="col-sm-6">
                                        <button type="submit" onClick={() => {setIsDelete(true)}} className="btn btn-warning">Delete</button>
                                    </div>
                                    <div className="col-sm-6">
                                        <button type="submit" onClick={() => {setDeleteToggle(false)}} className="btn btn-primary">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>
                }

            <div className="row">
            <ToastContainer autoClose={2000} />
                <div className="col-lg-12 mb-4">
                    <div className="float-right ">
                        <button type="submit" className="btn btn-success" onClick={handleEventModal}>+ New Quiz</button>
                    </div>
                        <hr/>
                </div>
                <div className="card-columns">
                {quizeList_.length === 0 &&
                    <label className="col-form-label form-label"> Looks like quiz list is empty, start adding quiz</label>
                }
                {quizeList_.length > 0 && quizeList_}
                </div>
            </div>
        </div>
    </FacLayout>
  )
}
export default AddQuiz;