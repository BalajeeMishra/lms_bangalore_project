import FacLayout from "./faculty";
import { useState, useEffect } from "react";
import Modal from "../src/components/modal/Modal";
import FacultyService from './api/faculty.service';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import TabLayout from "../src/components/Tabs";
import CourseMaterialsView from "../src/components/CourseMaterialsView";
import GenericModal from "../src/components/GenericModal";
import StudentService from "./api/student.service";

const initialState = {
    course_title: "",
    course_desc: "",
    course_category: "",
    course_material: ""
};

const AddCourse = () => {

    const [modalToggle, setModalToggle] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [showGenericModal, setShowGenericModal] = useState(false)
    const [tabName, setTabName] = useState(null)

    const [input, setInput] = useState({
        course_title: "",
        course_desc: "",
        course_category: "",
        course_material: "",
        id: ""
    });
    const [error, setError] = useState("");
    const [courseList, setCourseList] = useState([]);
    const [courseCateogery, setCourseCateogery] = useState();
    const [validation, setValidation] = useState(false);
    const [materials, setMaterials] = useState([]);
    const [isupdate, setIsupdate] = useState(false);
    useEffect(() => {
        const chunk = 4;
        StudentService.listCourseMaterial().then(res => {
            if (res && res.status === 200) {
                splitIntoChunk(res.data.data, chunk, 'materials');
            }
        })
    }, [])


    function splitIntoChunk(arr, chunk, type) {
        let allChunks = []
        for (let i = 0; i < arr.length; i += chunk) {
            let chunkArray;
            chunkArray = arr.slice(i, i + chunk);
            allChunks.push(chunkArray)
        }
        if(type === "materials"){
            setMaterials(allChunks)
        }

    }
    useEffect(() => {
        if (!modalToggle) setError('')
    }, [modalToggle])
    const handleChange = e => {
        const { name, value } = e.target;
        if (name === "course_material") {
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
    };

    useEffect(() => {
        // Your code here
        FacultyService.listCourse().then(res => {
            if (res && res.data && res.data.data) {
                setCourseList(res.data.data)
            }
        })

        FacultyService.getCourseCateogery().then(res => {
            if (res && res.data && res.data.data) {
                setCourseCateogery(res.data.data)
            }
        })
    }, []);

    const submitCourse = e => {
        e.preventDefault()
        let { course_title, course_desc, course_category, course_material,id } = input;
        let validation_ = false;
        let course_data = {
            "title": course_title,
            "description": course_desc,
            "category_id": course_category
        }

        if (course_title == "") {
            setError("Module Title should not be empty")
            setValidation(true)
            validation_ = true
        }
        else if (course_desc == "") {
            setError("Module description should not be empty")
            setValidation(true)
            validation_ = true
        }
        else if (course_category == "") {
            setError("Course category should not be empty")
            setValidation(true)
            validation_ = true
        }

        if (validation_ == false) {

            if (!isupdate && !isDelete) {
                FacultyService.addCourse(course_data).then(res => {
                    if (res.status == 200) {
                        setError("")
                        setModalToggle(false)
                        setInput({ ...initialState });
                        toast.success("Success: Course added");
                        let courseId = res && res.data && res.data.data;
                        let formData = new FormData();
                        formData.append("file", course_material);
                        let md = {
                            folderName: 'Course',
                            id: courseId,
                            formdata: formData
                        }
                        let file_data = {
                            "course_id": courseId,
                            formdata: formData
                        }
                        if (file_data) {
                            FacultyService.uploadCourse(file_data).then(res => {
                                console.log("uploaded res", res)
                            }).catch(err => {
                                console.log('err = ', err)
                            })
                        }
                        FacultyService.listCourse().then(res => {
                            if (res && res.data && res.data.data) {
                                setCourseList(res.data.data)
                            }
                        })
                    } else {
                        setError(res.data.message)
                    }
                })
                .catch(err => {
                    setError(err)
                })
            } else if (isupdate && !isDelete) {

                FacultyService.updateCourse(course_data, id).then(res => {
                    if (res.status == 200) {
                        setError("")
                        setModalToggle(false)
                        setInput({ ...initialState });
                        toast.success("Success: Course Updated");  
                        FacultyService.listCourse().then(res => {
                            if (res && res.data && res.data.data) {
                                setCourseList(res.data.data)
                            }
                        })
                    } else {
                        setError(res.data.message)
                    }
                })
                .catch(err => {
                    setError(err)
                })
                setIsupdate(false)
            } else if (isDelete) {
                console.log("dlete", isDelete)
                FacultyService.deleteCourse(id).then(res => {
                    if (res.status == 200) {
                        setError("")
                        setDeleteToggle(false)
                        setInput({ ...initialState });
                        toast.success("Success: Course Deleted");  
                        FacultyService.listCourse().then(res => {
                            if (res && res.data && res.data.data) {
                                setCourseList(res.data.data)
                            } else {
                                setCourseList([])
                            }
                        })
                    } else {
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

    const handleEventModal = () => {
        setInput({...initialState})
        setModalToggle(true);
        setIsupdate(false)
    }
    
    function handleEditCourse(element){
        const editState = {
            course_title: element?.title ,
            course_desc: element?.description,
            course_category: element?.category,
            id: element?.id
            // course_material: ""
        };
        setInput({...editState})
        setModalToggle(true);
        setIsupdate(true)
    }

    function handleDeleteCourse(element) {
        const deleteState = {
            id: element?.id
        };
        setInput({...deleteState})
        setDeleteToggle(true);
    }

    let course_list = []
    if (courseList) {
        courseList.forEach((element, index) => {
            course_list.push(
                <div className="card card-sm" key={element.title + '_' + element.id}>
                    <div className="card-body media">
                        <div className="media-left">
                            <a href="#" className="avatar avatar-lg avatar-4by3">
                                <img src="/assets/images/courses/module.png" alt="Card image cap" className="course-img rounded" />
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="card-title mb-0"><a href="#">{element.title}</a></h4>
                            <small className="text-muted">{element.description}</small>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button onClick={()=>{ handleEditCourse(element);}} className="btn btn-default btn-sm float-right">
                        <i className="fas fa-edit"></i> Edit 
                        </button>
                        <button onClick={()=>{ handleDeleteCourse(element);}} className="btn btn-default btn-sm float-right">
                        <i className="fas fa-trash"></i> Delete 
                        </button>
                        <div className="clearfix"></div>
                    </div>
                    
                </div>
            )
        });
    }

    let course_category_ = [];
    if (courseCateogery) {
        courseCateogery.forEach(element => {
            course_category_.push(<option key={element.id} value={element.id}>{element.title}</option>)
        });
    }

    let course_List = [];
    if (courseList) {
        courseList.forEach(element => {
            course_List.push(<option key={element.id} value={element.id}>{element.title}</option>)
        });
    }

    function ModuleTab() {
        return (
            <>
                <div className="col-lg-12 mb-4 p-0">
                    <button type="submit" className="btn btn-success" onClick={handleEventModal}>+ New Module</button>
                </div>
                <div className="card-columns">
                    {course_list}
                </div>
            </>
        )
    }
    function ShowList() {
        if(tabName !=='Course Materials'){
            return
        }
        function Content() {
            const [module, SetModule] = useState("")
            const [courseMaterial, SetCourseMaterial] = useState("")
            // const baseUrl = api.defaults.baseURL +"/material?key="+ props.urlKey;
            // console.log("baseUrl", baseUrl)
            function handleChangeModule(e) {
                if (e && e.target.value) SetModule(e.target.value)
            }
            function handleChangeFile(e) {
                if (e && e.target.files && e.target.files[0]) SetCourseMaterial(e.target.files[0])
            }
            function uploadCM() {
                // console.log("module", module)
                let formData = new FormData();
                formData.append("file", courseMaterial);
                let md = {
                    "course_id": module,
                    formdata: formData
                }
                FacultyService.uploadCourse(md).then(res => {
                    setShowGenericModal(false)
                    if (res && res.status === 200){
                        toast.success("Success: Course Material Uploaded");
                        const chunk = 4;
                        StudentService.listCourseMaterial().then(res => {
                            if (res && res.status === 200) {
                                splitIntoChunk(res.data.data, chunk, 'materials');
                            }
                        })
                    }else{
                        toast.error("Course Material failed Uploading");
                    } 
                }).catch(err => {
                    toast.error("Course Material failed Uploading");
                    console.log('err = ', err)
                })
            }
            return (
                <>
                    <div className="form-group row">
                        {/* <label for="quiz_desc" className="col-sm-2 col-form-label form-label">Video URL:</label>
                                    <div className="col-sm-4 col-md-4">
                                        <input id="quiz_vid" type="text" className="form-control" placeholder="Video URL" />
                                    </div> */}
                        <label className="col-sm-3 col-form-label form-label">Select Module</label>
                        <div className="col-sm-9 col-md-9">
                            <select
                                id="select_Module"
                                name="select_Module"
                                value={module}
                                onChange={handleChangeModule}
                                className="form-select">
                                <option value="">Select Course</option>
                                {course_List}
                            </select>
                        </div>
                    </div>
                    {!isupdate &&
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label form-label">Course material</label>
                        <div className="col-sm-9 col-md-9">
                            <Form.Group controlId="formFileLg" className="mb-3">
                                {/* <Form.Label>Large file input example</Form.Label> */}

                                <input onChange={handleChangeFile} type="file" size="lg" name="course_material" />
                            </Form.Group>
                        </div>
                    </div>
                    }
                    <div className="col-lg-12 mb-4 p-0">
                        <button type="submit" className="btn btn-success" onClick={() => { uploadCM() }}>Upload</button>
                    </div>
                </>
            )
        }
        return (
            <div className="content">
                <div className="col-lg-12 mb-4 p-0">
                    <button type="submit" className="btn btn-success" onClick={() => { setShowGenericModal(true) }}>+ Add Course Material</button>
                </div>
               {showGenericModal&& <GenericModal xl={false} hideClose={true} setShowModal={setShowGenericModal} showModal={showGenericModal} header={"Course Material"} content={<Content />}  />}
                <CourseMaterialsView materials={materials} />
            </div>
        )
    }
    return (
        <FacLayout>
            <p className='title-db'>HOME / MODULE / COURSE MATERIALS</p>
            <div className="container assignMentModel">

                {modalToggle && 
                <Modal
                        title="Module"
                        toggle={modalToggle}
                        onClose={() => { setModalToggle(false) }} >
                        <div className="row m-3">
                            <div className="col-lg-12 col-md-12">
                                <span className='err text-center'>{error}</span>
                                <form onSubmit={submitCourse} autoComplete="off">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label form-label">Module Title:</label>
                                        <div className="col-sm-9 col-md-9">
                                            <input id="quiz_title"
                                                name="course_title"
                                                value={input.course_title}
                                                onChange={handleChange}
                                                type="text"
                                                className="form-control"
                                                placeholder="Title"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label form-label">Module Description:</label>
                                        <div className="col-sm-9 col-md-9">
                                            <textarea
                                                className="form-control"
                                                id="course_desc"
                                                name="course_desc"
                                                value={input.course_desc}
                                                onChange={handleChange}
                                                rows="2"></textarea>
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                    <label for="quiz_image" className="col-sm-3 col-form-label form-label">Course Image:</label>
                                    <div className="col-sm-9 col-md-9">
                                        <p><img src="/assets/images/courses/nodejs.png" alt="" width="150" className="rounded"/></p>
                                        <div className="custom-file">
                                            <input type="file" id="quiz_image" className="custom-file-input"/>
                                            <label for="quiz_image" className="custom-file-label">Choose file</label>
                                        </div>
                                    </div>
                                </div> */}
                                    <div className="form-group row">
                                        {/* <label for="quiz_desc" className="col-sm-2 col-form-label form-label">Video URL:</label>
                                    <div className="col-sm-4 col-md-4">
                                        <input id="quiz_vid" type="text" className="form-control" placeholder="Video URL" />
                                    </div> */}
                                        <label className="col-sm-3 col-form-label form-label">Course</label>
                                        <div className="col-sm-9 col-md-9">
                                            <select
                                                id="course_category"
                                                name="course_category"
                                                value={input.course_category}
                                                onChange={handleChange}
                                                className="form-select">
                                                <option value="">Select Course</option>
                                                {course_category_}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label form-label">Course material</label>
                                        <div className="col-sm-9 col-md-9">
                                            <Form.Group controlId="formFileLg" className="mb-3">
                                                {/* <Form.Label>Large file input example</Form.Label> */}

                                                <input onChange={handleChange} type="file" size="lg" name="course_material" />
                                            </Form.Group>
                                        </div>
                                    </div>


                                    <div className="form-group row mb-0">
                                        <div className="col-sm-9 offset-sm-3">
                                            <button type="submit" className="btn btn-success">{isupdate ? "Update" : "Save"}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                </Modal>
                }

                {deleteToggle && 
                <Modal
                title="Module"
                toggle={deleteToggle}
                onClose={() => { setDeleteToggle(false) }} >
                    <form onSubmit={submitCourse} autoComplete="off">
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

                <div className="row ">
                    <ToastContainer autoClose={2000} />
                    <div className="col-lg-12">
                        <div className="bg-layout wow fadeInUp delay-0-2s" >
                            <TabLayout tab1={<ModuleTab />} tabName1={'Add Module'} tab2={<ShowList />} tabName2={'Course Materials'} setTabName={setTabName} />
                            {/* <AddAssign/> */}
                        </div>
                    </div>
                </div>
            </div>
        </FacLayout>
    )
}
export default AddCourse;