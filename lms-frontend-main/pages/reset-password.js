import Link from "next/link";
import { useEffect, useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "./api/auth.service";

function ResetPassword() {
  const [encEmail, setEncEmail] = useState('')
  useEffect(() => {
    let params = getQueryStringParams(window.location.search)
    if (params && params.email) {
      let emailStr = params.email
      // setEncEmail(emailStr.slice(2, emailStr.length))
      setEncEmail(emailStr)
    }
  }, [])
 
 const getQueryStringParams = query => {
  return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
              let [key, value] = param.split('=');
              params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
              return params;
          }, {}
          )
      : {}
};
  const [input, setInput] = useState({
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmpassword: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateInput(e);
  };

  // Validate input errors
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter New Password.";
          } else if (input.confirmpassword && value !== input.confirmpassword) {
            stateObj["all"] = "Password and Confirm New Password does not match.";
          }else if (input.confirmpassword && value === input.confirmpassword) {
            stateObj['all'] = "";
          } else {
            stateObj["confirmpassword"] = input.confirmpassword ? "" : error.confirmpassword;
          }
          break;
        case "confirmpassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm New Password.";
          } else if (input.password && value !== input.password) {
            stateObj['all'] = "Password and Confirm Password does not match.";
          }else if (input.password && value === input.password) {
            stateObj['all'] = "";
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
    const { confirmpassword, password } = input;
    let errMsg = ''
    if (password === "") {
      errMsg = "New Password can not be empty."
    } else if (confirmpassword === "") {
      errMsg = "Confirm Password cant not be empty."
    } else if (password !== confirmpassword) {
      errMsg = "Password and Confirm Password does not match."
    } else {
      setError('')
    }

    if (errMsg !== "") {
      setError(prev => ({
        ...prev,
        all: errMsg
      }))
      return false;
    }
    //todo need to read email from url which is encyrpted
    let userData = {
      email: encEmail,
      new_password: password
    }
    AuthService.resetPassWord(userData).then((res) => {
      console.log('reset password response : ', res)
      if (res.status === 200) {
        toast.info('Resetting the Password')
      }
    })

  }

  return (
    <Layout>
      <PageBanner pageName={"Reset Password"} />
      {/* ResetPassword Form Start */}
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
              <div className="col-md-10">
                {error.all && <span className='err'>{error.all}</span>}
                <div className="row">

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
                        placeholder="New Password"
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
                        placeholder="Confirm New Password"
                      />
                      {error.confirmpassword && <span className='err'>{error.confirmpassword}</span>}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-center mb-0">
                      <button type="submit" className="theme-btn">
                        Reset Password <i className="fas fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* ResetPassword Form End */}
    </Layout>
  )
}

export default ResetPassword;