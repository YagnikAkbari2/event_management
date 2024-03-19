import React from "react";
import { Modal, Button } from "react-bootstrap";

const CommonToasterErrorModal = (props) => {
  return (
    <Modal
      show={props?.show}
      size={"sm"}
      className={"position-fixed top-30"}
    >
      <Modal.Header>
        <Modal.Title className="fs-5 text-danger">Unauthenticated</Modal.Title>
      </Modal.Header >
      <Modal.Body className="">
        <p className="fs-6 text-wrap">
          You have been logged out because your Email is been used my someone
          else!
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-start text-primary fs-6 text-wrap">
        {`You will get redirected to Login Page now.`}
      </Modal.Footer>
    </Modal>
  );
};

export default CommonToasterErrorModal;
