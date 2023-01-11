import api from "./api";

const listCourseMaterial = () => {
  return api
    .get("/student_course_material_list")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log(error)
      return error.response;
    });
};

const listCourseDetails = () => {
  return api
    .get("/student_course_details")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log(error)
      return error.response;
    });
};

const getCourseDetails = (category_id) => {
  return api
    .get(`/student_course_details/${category_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log(error)
      return error.response;
    });
};

const listModuleMaterial = () => {
  return api
    .get("/student_module_material_list")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log(error)
      return error.response;
    });
};

const listZoomRecords = () => {
  return api
    .get("/zoom")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const createfeedback = (data) => {
  return api
    .post("/feedback", { ...data })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const listfeedback = () => {
  return api
    .get("/feedback")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deletefeedback = (id) => {
  return api
    .delete(`/feedback/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const StudentService = {
  listCourseMaterial,
  listCourseDetails,
  getCourseDetails,
  listZoomRecords,
  listModuleMaterial,
  createfeedback,
  listfeedback,
  deletefeedback
};

export default StudentService;
