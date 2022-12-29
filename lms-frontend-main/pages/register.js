import Link from "next/link";
import { useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import AuthService from './api/auth.service';
import Router from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    type: "",
    qualification: "",
    skills: ""
  });

  const [error, setError] = useState({
    all: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    type: "",
    qualification: "",
    skills: ""
  });

  const handleChange = e => {
    const {name, value} = e.target;
    setInput(prevState => ({
      ...prevState,
      [name] : value
    }));
    validateInput(e);
  };

  // Validate input errors
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = {...prev, [name]: ""};
      switch (name) {
        case "firstname":
          if (!value) {
            stateObj[name] = "Please enter firstname.";
          }
          break;
        case "lastname": 
          if(!value) {
            stateObj[name] = "Please enter lastname.";
          }
        case "email":
          if (!value) {
            stateObj[name] = "Please enter email.";
          }
          break;
        case "phone": 
          if(!value) {
            stateObj[name] = "Please enter phone number.";
          }
        case "password":
          if (!value) {
            stateObj[name] = "Please enter password.";
          }else if (input.confirmpassword && value !== input.confirmpassword) {
            stateObj["confirmpassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmpassword"] = input.confirmpassword ? "" : error.confirmpassword;
          }
          break;
        case "confirmpassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
        case "type": 
          if(!value) {
            stateObj[name] = "Please select type.";
          }
          break;
        case "qualification": 
          if(!value) {
            stateObj[name] = "Please enter Occupation.";
          }
          break;
        case "skills": 
          if(!value) {
            stateObj[name] = "Please enter Exprience.";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  //handle submit form
  const handleSubmit = e => {
    e.preventDefault();
    const { firstname, lastname, email, phone, password, type, qualification, skills } = input;
    
    if(firstname === "" || lastname === "" || email === "" || phone === "" || password === "" || type === "" || qualification === "" || skills === ""){
      setError(prev => ({
        ...prev,
        all: "Please enter all fields !"
      }))
      return false;
    }

    let userData = {
      first_name: firstname,
      last_name: lastname,
      is_staff: type,
      email: email,
      phone_number: phone,
      qualification: qualification,
      skills: skills,
      password: password
    }
    AuthService.register(userData)
      .then(res => {
        console.log("res", res)

        if(res.status === 200) {
          toast.success("Success: User Registered");
          setTimeout(() => {
            Router.push('/login')
          }, 2000)
        }
        else if(res.response.status === 400) {
          toast.error(`Error: ${res.response.data.message}`)
        }
        
      })
      .catch(error => {
        toast.error(`Error: ${error.message}`)
      })
  }

  return (
    <Layout>
      <PageBanner pageName={"Register"} />
      {/* Regiter Form Start */}
      <section className="contact-form-area wow fadeInUp delay-0-2s">
        <div className="container">
        <ToastContainer autoClose={2000} />
          <form
            onSubmit={handleSubmit}
            id="register-form"
            className="p-50 z-1 rel"
            name="contact-form"
            action="#"
            method="post"
            autoComplete="off"
          >
            <div className="row mt-25 justify-content-center">
              <div className="col-md-8">
              {error.all && <span className='err'>{error.all}</span>}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="first-name"
                        name="firstname"
                        value={input.firstname}
                        onChange={handleChange}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Fisrt Name"
                      />
                      {error.firstname && <span className='err'>{error.firstname}</span>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="last-name"
                        name="lastname"
                        value={input.lastname}
                        onChange={handleChange}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Last Name"
                      />
                      {error.lastname && <span className='err'>{error.lastname}</span>}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email-address"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Email Address"
                      />
                      {error.email && <span className='err'>{error.email}</span>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="number"
                        pattern="[0-9]"
                        id="phone"
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Phone Number"
                      />
                      {error.phone && <span className='err'>{error.phone}</span>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Password"
                      />
                      {error.password && <span className='err'>{error.password}</span>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        id="confirm-password"
                        name="confirmpassword"
                        value={input.confirmpassword}
                        onChange={handleChange}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Confirm Password"
                      />
                      {error.confirmpassword && <span className='err'>{error.confirmpassword}</span>}
                    </div>
                  </div>
                  <div className="col-md-6">
                      <select 
                        id="type" 
                        name="type"
                        onChange={handleChange}
                        onBlur={validateInput}
                        value={input.type}
                        className="form-select">
                        <option value="">Select type</option>
                        <option value="0">Student</option>
                        <option value="1">Faculty</option>
                      </select>
                      {error.type && <span className='err'>{error.type}</span>}
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        value={input.qualification}
                        onChange={handleChange}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Occupation"
                      />
                      {error.qualification && <span className='err'>{error.qualification}</span>}
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={input.skills}
                        onChange={handleChange}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Experience"
                      />
                      {error.skills && <span className='err'>{error.skills}</span>}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group text-center mb-0">
                      <button type="submit" className="theme-btn">
                        Register <i className="fas fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                  
                </div>
              <Link href="/login">
                Already have an account?      
              </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* Regiter Form End */}
    </Layout>
  )
}

export default Register;