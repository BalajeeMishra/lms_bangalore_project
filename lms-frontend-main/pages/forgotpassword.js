import { useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "./api/auth.service";

const ForgotPassWord = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('')

  // Validate input errors
  const validateInput = e => {
    let { name, value } = e.target;
    if (!value) {
      setErrorMsg("Please enter email.")
    } else {
      setErrorMsg('')
    }
  };

  //handle submit form
  const handleSubmit = e => {
    e.preventDefault();
    if (email === "") {
      setErrorMsg("Please enter email.")
      return false;
    }

    let userData = {
      email: email,
    }
    AuthService.resetPassWordEmail(userData).then((res)=>{
      console.log('resetPassWordEmail response', res)
      if(res.status === 200){
        toast.info("Check your Mail...");
      }
    })
  }

  return (
    <Layout>
      <PageBanner pageName={"Forgot Password"} />
      {/* ForgotPassWord Form Start */}
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
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email-address"
                        name="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        onBlur={validateInput}
                        className="form-control"
                        placeholder="Email Address"
                      />
                      {errorMsg && <span className='err'>{errorMsg}</span>}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-center mb-0">
                      <button type="submit" className="theme-btn">
                        Send Password Reset Email <i className="fas fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* ForgotPassWord Form End */}
    </Layout>
  )
}

export default ForgotPassWord;