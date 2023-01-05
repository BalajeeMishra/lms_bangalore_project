import api from "./api";

const addCourse = (courseData) => {
  return api
    .post("/course_detail", {
      ...courseData
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const editCourse = (courseData) => {
  return api
    .put(`/course_detail/${courseData['id']}`, {
      ...courseData
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const uploadAssets = (data) => {
  console.log("data", data);
  let path = "/assets";
  return api
    .post(path, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const listCourseDetails = () => {
  return api
    .get("/course_details")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const getCourseDetails = (category_id) => {
  return api
    .get("/course_details/" + category_id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const getTeachers = () => {
  return api
    .get("/teacher")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deleteCourseDetails = (category_id) => {
  return api
    .delete("/course_detail/" + category_id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const AdminService = {
  addCourse,
  editCourse,
  uploadAssets,
  listCourseDetails,
  getCourseDetails,
  getTeachers,
  deleteCourseDetails
};

export default AdminService;
