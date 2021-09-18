import React, { useState, useEffect } from "react";
import CheckCircleSuccess from "./CheckCircleSuccess";

import Modal from "react-bootstrap/Modal";

const MyModal = ({ data, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (data) setShow(true);
    return () => {
      setShow(false);
    };
  }, [data]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose} className="my-modal">
        <Modal.Header closeButton></Modal.Header>
        <CheckCircleSuccess message={data?.message} />

        {children}
      </Modal>
    </>
  );
};

export default MyModal;
