import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import FacLayout from "./faculty";
import FacultyService from "./api/faculty.service";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
const UploadVideo = () => {
  const [input, setInput] = useState({
    video_file: ""
  });
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const handleChangeFile = (e) => {
    const { name, value } = e.target;
    if (name === "video_file") {
      setInput((prevState) => ({
        ...prevState,
        [name]: e.target.files[0]
      }));
    }
  };

  function submitForm() {
    let { video_file } = input;
    const formData = new FormData();
    formData.append("file", video_file);
    const data = {
      form_data: formData
    };
    setSpinner(true);
    FacultyService.uploadVideo(data).then((res) => {
      if (res.status == 202) {
        toast.success("Success: video uploaded successfully");
        router.push("/upload-video");
        setSpinner(false);
        // alert("uploaded");
      } else {
        return toast.error("somethig went wrong");
        // alert(res.error);
      }
    });
  }

  return (
    <>
      {spinner && (
        <FacLayout>
          <ClipLoader />
        </FacLayout>
      )}
      {!spinner && (
        <FacLayout>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label form-label">Course material</label>
            <div className="col-sm-9 col-md-9">
              <Form.Group controlId="formFileLg" className="mb-3">
                <input onChange={handleChangeFile} type="file" size="lg" name="video_file" />
              </Form.Group>
            </div>
          </div>
          <div className="col-lg-12 mb-4 p-0">
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => {
                submitForm();
              }}
            >
              Submit
            </button>
          </div>
        </FacLayout>
      )}
    </>
  );
};

export default UploadVideo;
