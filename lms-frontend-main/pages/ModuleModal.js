import { useState, useEffect } from "react";
import Modal from "../src/components/modal/Modal";
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form'
import { Button, Col, Row } from "react-bootstrap";
 function ModuleModal(props){
      
    return( <div className="slotmodal">
              
          <Modal
        
              title="Module"
              sm={true}
              toggle={props.modModalToggle}
              onClose={() => { props.setModModalToggle(false);  props.setModuleDetails({...props.initialModDetails}); props.setDeleteMod(false); }} >
              <div className="row m-3">
              <form name="module" onSubmit={(e)=> props.addModuleHandle(e)} autoComplete="off" className="w-100">
                  <div className="w-100">
                          <Form.Group as={Row} controlId="formPlaintextModTitle">
                              <Form.Label column sm="4">
                                 Title
                              </Form.Label>
                              <Col sm="8">
                                  <Form.Control required onChange={(e) => props.handleChange(e, 'module')} name="title" type="text" value={props?.moduleDetails?.title} placeholder="Module Title" />
                              </Col>
                      </Form.Group>

                          <Form.Group as={Row} controlId="formPlaintextFreq">

                              <Form.Label column sm="4">
                                  Points
                              </Form.Label>
                              <Col sm="8">
                                  <Form.Control required onChange={(e) => props.handleChange(e, 'module')} name="points"  type="text" value={props?.moduleDetails?.points} placeholder="Add points/details" />
                              </Col>
                      </Form.Group>
                   
                      {!props.deleteMod &&<Button type="submit"> Add </Button>}
                         {/* {deleteMod && <Button className="m-2" onClick={() => updateSlot()}> Update </Button>} */}
                         {props.deleteMod && <Button className="m-2" onClick={() => props.deleteModule()}> Delete </Button>}
                  </div>
                  </form>
              </div>
          </Modal>
          </div>)
          
  }
export default ModuleModal