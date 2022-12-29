import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button, Col, Row } from "react-bootstrap";
import CartService from '../../pages/api/cart.service';

const initialDetails = {
    fname: "",
    lname: "",
    email: "",
    mobile: ""
};
function EnquiryModal(props) {
    const [enqDetails, setEnqDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: ""
    });


    function handleClose() {
        props.setEnquiryModal(false);
        if (props && props.setDocKey) props.setDocKey(null)
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setEnqDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit = e => {
        e.preventDefault();
        const { firstname, lastname, email, mobile } = enqDetails;
      
        let enqData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            mobile_number: mobile,
            course:props.enquiryCourse
        }
        CartService.enquire(enqData).then((res)=>{
            if(res?.status === 200){
                props?.toast.success("Thank you, We will contact you soon")
                props.setEnquiryModal(false)
                setEnqDetails({...initialDetails})
            }
        })
    }
    return (
        <>
            <Modal show={props.showModal} onHide={handleClose} dialogClassName={props.xl ? "modal-xl" : ""} className={props.xl ? 'vidModal' : ''}>
                <Modal.Header closeButton>
                    Send an enquiry
                </Modal.Header>
                <Modal.Body>
                    <div className="w-100">
                        <form
                            onSubmit={handleSubmit}
                            id="register-form"
                            name="contact-form"
                            action="#"
                            method="post"
                            autoComplete="off"
                        >
                            <Form.Group as={Row} controlId="formPlaintextModTitle">
                                <Form.Label column sm="4">
                                    First Name
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control required onChange={(e) => handleChange(e)} name="firstname" type="text" placeholder="First Name" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextModTitle">
                                <Form.Label column sm="4">
                                    Last Name
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control required onChange={(e) => handleChange(e)} name="lastname" type="text" placeholder="Last Name" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextModTitle">
                                <Form.Label column sm="4">
                                    Email Id
                                </Form.Label>
                                <Col sm="8">
                                    <input
                                        type="email"
                                        id="email-address"
                                        name="email"
                                        required
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Email Address"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextModTitle">
                                <Form.Label column sm="4">
                                    Phone No
                                </Form.Label>
                                <Col sm="8">
                                    <input required onChange={(e) => handleChange(e)} name="mobile" type="number" maxLength={10} value={enqDetails.mobile} placeholder="Phone No" />
                                </Col>
                            </Form.Group>
                            <Button className='enq-btn' type="submit" variant="secondary">
                                Submit
                            </Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EnquiryModal