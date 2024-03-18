import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface EmployeeCodeModalProps {
  show?: boolean;
  handleClose?: () => void;
  handleSave?: (code: string) => void;
}

const EmployeeCodeModal: React.FC<EmployeeCodeModalProps> = ({
  show,
  handleClose,
  handleSave,
}) => {
  const [code, setCode] = useState<string>("");

  return (
    <Modal show={show} size={"sm"} className={"position-fixed top-30"}>
      <Modal.Header>
        <Modal.Title className="fs-5 text-danger">Employee Code</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <input
          className="form-control px-1"
          value={code}
          placeholder="Enter Your Employee Code"
          onChange={(e) => setCode(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-start text-primary fs-6 text-wrap">
        <Button
          variant="light"
          className="cancel-button px-4 me-3"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="px-4"
          onClick={() => handleSave?.(code)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeCodeModal;
