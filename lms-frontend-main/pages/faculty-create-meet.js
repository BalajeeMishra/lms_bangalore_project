import axios from "./api/api";
import FacLayout from "./faculty";
import FacultyService from "./api/faculty.service";
import { useState, useEffect } from "react";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabLayout from "../src/components/Tabs";

const CreateMeet = () => {
  const [courseList, setCourseList] = useState([]);
  const [meetList, setMeetList] = useState([]);

  useEffect(() => {
    FacultyService.listCourse().then((res) => {
      setCourseList(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("/create_meeting")
      .then((res) => {
        setMeetList(res.data.data);
        // console.log("res", res.data.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  return (
    <FacLayout>
      <p className="title-db">HOME / JOIN MEET</p>
      <div className="container">
        <div className="row justify-content-center">
          <ToastContainer autoClose={2000} />
          <div className="col-lg-12">
            <div className="bg-layout wow fadeInUp delay-0-2s">
              <TabLayout tab1={<CreateMeet />} tabName1={"Create Live class link"} tab2={<MeetList />} tabName2={"Meeting Link"} />
            </div>
          </div>
        </div>
      </div>

      {/* <Meeting/> */}
    </FacLayout>
  );
  function CreateMeet() {
    const [input, setInput] = useState({
      meet_topic: "",
      meet_duration: "",
      meet_course: "",
      meet_pass: "",
      meet_time: new Date()
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setInput((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };

    const onHandleSubmit = (e) => {
      e.preventDefault();
      let { meet_topic, meet_duration, meet_course, meet_pass, meet_time } = input;
      console.log("meet_course", meet_course);
      // return
      axios
        .post("/create_meeting", {
          topic: meet_topic,
          duration: meet_duration,
          password: meet_pass,
          course_id: meet_course
        })
        .then((res) => {
          // console.log("meet",res)
          toast.success("Success: Meeting added");
          setTimeout(() => {
            Router.reload();
          }, 2000);
        })
        .catch((err) => {
          // console.log("err", err.message)
          return err;
        });
    };
    return (
      <div className="content">
        <form onSubmit={onHandleSubmit}>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label form-label">Topic name</label>
            <div className="col-sm-8">
              <input type="text" name="meet_topic" className="form-control" value={input.meet_topic} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label form-label">Duration(in minutes)</label>
            <div className="col-sm-8">
              <input type="number" name="meet_duration" className="form-control" value={input.meet_duration} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label form-label">Module:</label>
            <div className="col-sm-8 col-md-8">
              <select name="meet_course" onChange={handleChange} value={input.meet_course} className="form-select">
                <option value="">Select Module</option>
                {courseList &&
                  courseList.map((e, key) => {
                    return (
                      <option key={e.id} value={e.id}>
                        {e.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label form-label">Passcode</label>
            <div className="col-sm-8">
              <input type="text" name="meet_pass" className="form-control" value={input.meet_pass} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label form-label">DateTime</label>
            <div className="col-sm-8">
              <input type="datetime-local" name="meet_time" className="form-control" value={input.meet_time} onChange={handleChange} />
            </div>
          </div>
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-success">
              Create Meeting
            </button>
          </div>
        </form>
      </div>
    );
  }

  function MeetList() {
    return (
      <div className="content">
        <ul className="course-video-list">
          {meetList === "" && <label className="col-form-label form-label"> Looks like Meeting Link is empty, start creating Meeting</label>}
          {meetList && (
            <div className="card" key={meetList.meeting_id}>
              <div className="card-body">
                <p className="card-text">Topic: {meetList.topic}</p>
                <p className="card-text">Passcode: {meetList.password}</p>
                <a href={meetList.start_url} target="_blank" rel="noreferrer">
                  <span className="title">Meet Link</span>
                  <i className="fas fa-video"></i>
                </a>
              </div>
            </div>
          )}
        </ul>
      </div>
    );
  }
};
export default CreateMeet;
