import FacLayout from "./faculty";
import Modal from "../src/components/modal/Modal";
import { useState } from "react";
import PaginationTable from "../src/components/PaginationTable";
import { useEffect } from "react";
import FacultyService from "./api/faculty.service";
import api from "../pages/api/api"

const columns = [
    {
        dataField: "assignment_name",
        text: "Assignment",
        sort: true
    },
    {
        dataField: "student_name",
        text: "Student Name"
    },
    {
        dataField: "submitted_time",
        text: "Submitted on"
    },
    // {
    //   dataField: "icon",
    //   text: " "
    // },
    {
        dataField: "fileIcon",
        text: "Download Attachment"
    },
    {
        dataField: "gradeList",
        text: "Grade"
    }
];

const GradeAssignment = () => {
    const [modalToggle, setModalToggle] = useState(false);
    const [clickedAssign, setClickedAssign] = useState(0);
    const [gradeData, setGradeData] = useState([]);

    const handleEventModal = (val) => {
        setModalToggle(true);
        setClickedAssign(val)
    }

    const downLoadFile = (val) => {
        const docUrl = api.defaults.baseURL + "material?download&key=" + val;
        window.open(docUrl)
    }
    useEffect(() => {
        FacultyService.listUploadedAssignmentMaterial().then(res => {
            console.log(' res ', res)
            if (res && res.status === 200 && res.data.data) {
                let icon = null
                let fileIcon = null

                res.data.data.forEach((element, index) => {
                    icon = <i className="fas fa-edit" onClick={() => handleEventModal(index)}></i>;
                    element['icon'] = icon
                    if (element && element.file_list && element.file_list.length > 0) {
                        fileIcon = <i className="fas fa-download cursorPointer" onClick={() => downLoadFile(element.file_list[0].Key)}></i>;
                        element['fileIcon'] = fileIcon
                    }
                    element['gradeList'] = <DropdownContent assignment={element} val={element.grade} />
                });
                setGradeData(res.data.data)
            }
        })
    }, [])

    const updateState = (asId, grade) => {
        setGradeData(prevState => {
            const newState = prevState.map(obj => {
                if (obj.assignment_id === asId) {
                    return { ...obj, grade: grade, gradeList: <DropdownContent assignment={obj} val={grade} /> };
                }
                return obj;
            });
            return newState;
        });
    };

    function handleOnChange(e, props) {
        if (e.target.value) {
            let data = {
                assignment_id: props.assignment.assignment_id,
                grade: parseInt(e.target.value)
            }

            updateState(data.assignment_id, e.target.value)
            FacultyService.assignGrade(data).then((res) => {
            }).catch((err) => {
                console.error("grade assign api error: ", err)
            })
        }
    }

    const DropdownContent = (props) => {
        let gradeCount = 10;
        let ops = []
        for (let i = 1; i <= gradeCount; i++) {
            ops.push(<option value={i}>{i}</option>)
        }
        return (
            <select onChange={(e) => handleOnChange(e, props)} name="grades" value={props.val} >
                <option value="">Select Grade</option>
                {ops}
            </select>

        )
    }
    return (
        <FacLayout>
            <p className='title-db'>HOME / ASSIGNMENT</p>
            <div className="container assignMentModel">

                {modalToggle
                    && <Modal
                        title="Assigmment"
                        toggle={modalToggle}
                        onClose={() => { setModalToggle(false) }}>
                        <div className="row m-3">
                            <div className="col-lg-12">
                                <h4 className="text-center">Coming soon...</h4>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Question: </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="alert alert-info" role="alert">
                                            {gradeData[clickedAssign].assignment_name}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Asnwer: </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="alert alert-success" role="alert">
                                            {gradeData[clickedAssign].assignment_name}
                                        </div>
                                    </div>
                                </div>
                                <form action="#">
                                    {/* <div className="form-group row">
                                <label for="course_title" className="col-sm-3 col-form-label form-label">Grade:</label>
                                <div className="col-sm-9 col-md-9">
                                    <input id="grade" type="text" value={gradeData[clickedAssign].grade} className="form-control" placeholder="0" />
                                </div>
                            </div> */}
                                    <div className="form-group row mb-0">
                                        <div className="col-sm-9 offset-sm-3">
                                            <button type="submit" className="btn btn-success">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>}

                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="bg-layout wow fadeInUp delay-0-2s" >
                            {gradeData.length > 0 ?
                                <PaginationTable data={gradeData} columns={columns} /> : <div className="container"><h4>No Assigmments</h4><br />Add Assigmments to grade</div>}
                            {/* <div className="content">
                            <h4>Grade Assignment</h4>
                            <div className="row">
                                <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Assignment</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Submitted on</th>
                                    <th scope="col">Grade</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">1</th>
                                    <td>	GitHub Basic Setup</td>
                                    <td>john</td>
                                    <td>10/09/2022 10:20AM</td>
                                    <td>10</td>
                                    <td><i className="fas fa-edit" onClick={handleEventModal}></i></td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                    <td>	GitHub Basic Setup</td>
                                    <td>mik</td>
                                    <td>19/08/2022 08:20AM</td>
                                    <td>7.5</td>
                                    <td><i className="fas fa-edit" onClick={handleEventModal}></i></td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td>	Vue.js Deploy Quiz</td>
                                    <td>tim</td>
                                    <td>15/07/2022 10:40AM</td>
                                    <td>-</td>
                                    <td><i className="fas fa-edit" onClick={handleEventModal}></i></td>
                                    </tr>
                                    <tr>
                                    <th scope="row">4</th>
                                    <td>	Gulp Front-End</td>
                                    <td>milind</td>
                                    <td>18/10/2022 09:50AM</td>
                                    <td>9</td>
                                    <td><i className="fas fa-edit" onClick={handleEventModal}></i></td>
                                    </tr>
                                    <tr>
                                    <th scope="row">5</th>
                                    <td>	Vue.js Deploy Quiz</td>
                                    <td>jeet</td>
                                    <td>01/10/2022 10:20AM</td>
                                    <td>-</td>
                                    <td><i className="fas fa-edit" onClick={handleEventModal}></i></td>
                                    </tr>
                                    <tr>
                                    <th scope="row">6</th>
                                    <td>	Vue.js Deploy Quiz </td>
                                    <td>yasin</td>
                                    <td>29/08/2022 10:20AM</td>
                                    <td>-</td>
                                    <td><i className="fas fa-edit" onClick={handleEventModal}></i></td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </FacLayout>
    )
}

export default GradeAssignment
