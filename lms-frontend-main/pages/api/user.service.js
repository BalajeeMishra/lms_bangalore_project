import api from "./api";

const getAssignmentList = () => {
    return api.get("/student_assignment_list")
    .then(response => {
        return response;
    })
    .catch(error => {
        // console.log(error)
        return error.response;
    });
};

const getAssignmentMaterialList = () => {
  return api.get("/student_assignment_material_list")
  .then(response => {
      return response;
  })
  .catch(error => {
      // console.log(error)
      return error.response;
  });
};

const submitAssignment = (assignemntData) => {
    return api.post("/submit_assignment", assignemntData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};


const uploadStudentAssignemnt = (data) => {

    console.log("data", data)
    let path = "/upload_student_assignment_material/" + data.assignment_id
    return api.post(path, data.formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
  };

const getQuizList = () => {
    return api.get("/student_quiz_list")
    .then(response => {
        return response;
    })
    .catch(error => {
        // console.log(error)
        return error.response;
    });
};

const getQuizQuestionList = (id) => {
    return api.get(`/student_quiz_question_list?id=${id}`)
    .then(response => {
        return response;
    })
    .catch(error => {
        // console.log(error)
        return error.response;
    });
};

const submitQuiz = (quizData) => {
    return api.post("/submit_quiz", quizData)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

const UserService = {
    getAssignmentList,
    submitAssignment,
    getQuizList,
    getQuizQuestionList,
    submitQuiz,
    uploadStudentAssignemnt,
    getAssignmentMaterialList
};

export default UserService;