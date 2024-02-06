import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const HandleAddToCart = ({  modal, handleClose, errorType }) => {
  return (
    <>
      <Modal show={modal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sorry :(</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { errorType && errorType === "auth" ? (
            <div>Sorry you need to register or sign in to continue</div>
          ) : (
            <div>
              Sorry you need to verify your account first, check your email!
            </div>
          )}
          <Modal.Footer>
            {errorType && errorType === "auth" ? (
              <LinkContainer to="/sign_in">
                <Button variant="primary"> Go to Register/Sign In</Button>
              </LinkContainer>
            ) : (
              <Button variant="primary" onClick={()=>alert('trigger mailservice')}>Resend Email for verfication </Button>
            )}
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HandleAddToCart;
