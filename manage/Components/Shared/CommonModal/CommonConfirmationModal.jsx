import React from "react";
import { Modal, Button } from "react-bootstrap";

const CommonConfirmationModal = (props) => {
  return (
    <Modal
      show={props?.show}
      onHide={props?.handleClose}
      size={props?.size ?? "lg"}
      centered={props.position !== "top"}
      className={"position-absolute"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3">
        <p>{props?.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="light"
          className="cancel-button px-4 me-3"
          onClick={props?.handleClose}
        >
          {props?.buttonCancel ?? "Cancel"}
        </Button>
        <Button
          variant="primary"
          className="px-4"
          onClick={() => props?.handleConfirm()}
        >
          {props?.buttonConfirm ?? "Yes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommonConfirmationModal;
