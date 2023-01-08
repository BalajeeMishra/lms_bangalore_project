import api from "./api";

const addCourse = (courseData) => {
  return api
    .post("/add_course", {
      courseData
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const addModule = (courseData) => {
  return api
    .post("/module", courseData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const listCourse = () => {
  return api
    .get("/add_course")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const listModule = () => {
  return api
    .get("/module")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const updateCourse = (courseData, id) => {
  return api
    .put("/add_course/" + id, {
      courseData
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const updateModule = (moduleData, id) => {
  return api
    .put("/module/" + id, moduleData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deleteCourse = (id) => {
  return api
    .delete("/add_course/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
const deleteModule = (id) => {
  return api
    .delete("/module/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const getCourseCateogery = () => {
  return api
    .get("/course_category")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const addQuiz = (quizData) => {
  return api
    .post("/add_quiz", {
      quizData
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const updateQuiz = (quizData, id) => {
  return api
    .put("/add_quiz/" + id, {
      quizData
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deleteQuiz = (id) => {
  return api
    .delete("/add_quiz/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const listQuiz = () => {
  return api
    .get("/add_quiz")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const addQuizQuestion = (quizData) => {
  return api
    .post("/add_quiz_question", {
      quizData
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const updateQuizQuestion = (quizData, id) => {
  return api
    .put("/add_quiz_question/" + id, {
      quizData
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deleteQuizQuestion = (id) => {
  return api
    .delete("/add_quiz_question/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const listQuizQuestion = () => {
  return api
    .get("/add_quiz_question")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const addAssignment = (data) => {
  return api
    .post("/add_assignment", {
      data
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const updateAssignment = (data, id) => {
  return api
    .put("/add_assignment/" + id, {
      data
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deleteAssignment = (id) => {
  return api
    .delete("/add_assignment/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const listAssignment = () => {
  return api
    .get("/add_assignment")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const listStudents = () => {
  return api
    .get("/student_list")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const uploadCourse = (data) => {
  console.log("data", data);
  let path = "/upload_course_material/" + data.course_id;
  return api
    .post(path, data.formdata, {
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

const uploadAssignemnt = (data) => {
  // console.log("data", data)
  let path = "/upload_assignment_material/" + data.assignment_id;
  return api
    .post(path, data.formdata, {
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

const listUploadedAssignmentMaterial = () => {
  return api
    .get("/uploaded_student_assignment_material_list/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const assignGrade = (data) => {
  // console.log("data", data)
  let path = "/add_grade/" + data.assignment_id;
  return api
    .put(path, { grade: data.grade })
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

const uploadVideo = (data) => {
  return api
    .post(`/video`, data.form_data, {
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

const listVideo = () => {
  return api
    .get("/video")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const FacultyService = {
  addCourse,
  listCourse,
  updateCourse,
  deleteCourse,
  getCourseCateogery,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  listQuiz,
  addQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  listQuizQuestion,
  addAssignment,
  updateAssignment,
  deleteAssignment,
  listAssignment,
  listStudents,
  uploadCourse,
  listZoomRecords,
  uploadAssignemnt,
  listUploadedAssignmentMaterial,
  assignGrade,
  getTeachers,
  uploadVideo,
  listVideo,
  addModule,
  listModule,
  updateModule,
  deleteModule
};

export default FacultyService;
