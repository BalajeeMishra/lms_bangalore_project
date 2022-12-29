import api from "./api";


const listCourseMaterial = () => {
    return api.get("/student_course_material_list")
    .then(response => {
      return response;
    })
    .catch(error => {
      // console.log(error)
      return error.response;
    });
};

const listZoomRecords = () => {
    return api.get("/zoom")
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

const StudentService  = {
    listCourseMaterial,
    listZoomRecords
}

export default StudentService;