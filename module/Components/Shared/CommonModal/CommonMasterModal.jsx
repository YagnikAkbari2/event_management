import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CommonMasterForm from "../CommonForm/CommonForm";
import CommonConfirmationModal from "./CommonConfirmationModal";

const CommonMasterModal = ({
  title,
  show,
  handleToggle,
  handleSave,
  formData,
  fieldData,
  configData,
  onClickAddField,
  handleChangeInput,
  handleChangeSelect,
  handleSubmit,
  onSelectColumnSearch,
  onChangeSearch,
  searchDropdownData,
  handleChangeFile,
  selectColumnSearch,
  searchResults,
  searchDropdownLabel,
  onSearchSelect,
  isDropdownPresent,
  innerSearchValue,
  isCheckValid,
  onChangeInputTag,
  onCLickPassword,
  isVisible,
  modalBodyClassName,
  handleClearFileUpload,
  customValue,
  modelSize,
  isEdited,
}) => {
  const [showClose, setShowClose] = useState(false);
  return (
    <>
      <Modal
        show={show}
        onHide={() => (isEdited === true ? setShowClose(true) : handleToggle())}
        size={modelSize ? modelSize : "lg"}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalBodyClassName ?? "px-5"}>
          <CommonMasterForm
            formJson={formData}
            fieldData={fieldData}
            configData={configData}
            onClickField={onClickAddField ?? (() => {})}
            handleChangeInput={handleChangeInput}
            handleChangeSelect={handleChangeSelect}
            handleSubmit={handleSubmit ?? (() => {})}
            onSelectColumnSearch={onSelectColumnSearch ?? (() => {})}
            selectColumnSearch={selectColumnSearch}
            onChangeSearch={onChangeSearch ?? (() => {})}
            searchDropdownData={searchDropdownData ?? (() => {})}
            handleChangeFile={handleChangeFile ?? (() => {})}
            searchResults={searchResults}
            searchDropdownLabel={searchDropdownLabel}
            onSearchSelect={onSearchSelect}
            isDropdownPresent={isDropdownPresent}
            innerSearchValue={innerSearchValue}
            isCheckValid={isCheckValid}
            onChangeInputTag={onChangeInputTag}
            onCLickPassword={onCLickPassword}
            isVisible={isVisible}
            handleClearFileUpload={handleClearFileUpload ?? (() => {})}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            className="cancel-button px-4 me-3"
            onClick={handleToggle}
          >
            Cancel
          </Button>
          {customValue ? (
            ""
          ) : (
            <Button variant="primary" className="px-4" onClick={handleSave}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <CommonConfirmationModal
        show={showClose}
        position="top"
        size="md"
        handleClose={() => setShowClose(false)}
        title="Are you sure you want to close?"
        message="All the unsaved changes will be lost."
        modalLayer={true}
        handleConfirm={() => {
          setShowClose(false);
          handleToggle();
        }}
      />
    </>
  );
};

export default CommonMasterModal;
