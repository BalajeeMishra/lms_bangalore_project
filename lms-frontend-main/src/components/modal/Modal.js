import React, { useEffect, useRef } from 'react';

const Modal = ({ toggle, onClose, title, children, sm }) => {

    
    const modalRef = useRef(null);
    useEffect(() => {
        toggle 
        ? modalRef.current.classList.add('visible') 
        : modalRef.current.classList.remove('visible') 
    }, [toggle]);


    return (
        <React.Fragment>
            <div ref={modalRef} className="modal__wrap">
                <div className="customModal" style={{width: sm ? "35%":""}} >
                    <div className="modal_title">
                        <h4>{title}</h4>
                    </div>
                    <div className="modal_close" onClick={onClose} >
                        <i className="fas fa-times"></i>
                    </div>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;
