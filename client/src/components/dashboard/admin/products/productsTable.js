import React from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";
import Loader from "utils/loader";

const ProductsTable = ({ prods,prev,next,goToEdit,removeModal,handleClose,handleModal, handleRemove }) => {

    const goToPrev = (page)=>{
        prev(page)
    }
    const goToNext = (page)=>{
        next(page)
    }
  return (
    <>
      {prods && prods.docs ? (
        <>
          <Table striped bordered hover>
            <thead>
              <th>Created</th>
              <th>Model</th>
              <th>Available</th>
            </thead>
            <tbody>
              {prods.docs.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <Moment to={item.date}></Moment>
                    </td>
                    <td>{item.model}</td>
                    <td>{item.available}</td>
                    <td
                      className="action_btn remove_btn"
                      onClick={() => handleModal(item._id)}
                    >
                      Remove
                    </td>
                    <td
                      className="action_btn edit_btn"
                      onClick={() => goToEdit(item._id)}
                    >
                      Edit
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination>
              {prods.hasPrevPage?  
              <>
                <Pagination.Prev onClick={()=>goToPrev(prods.prevPage)}></Pagination.Prev>
                
                <Pagination.Item onClick={()=>goToPrev(prods.prevPage)}>
                {prods.prevPage}
                </Pagination.Item>
              </>:null}
              <Pagination.Item active>
                {prods.page}
              </Pagination.Item>
               {prods.hasNextPage?  
              <>
              <Pagination.Item onClick={()=>goToNext(prods.nextPage)}>
                {prods.nextPage}
                </Pagination.Item>
              
                <Pagination.Next onClick={()=>goToNext(prods.nextPage)}></Pagination.Next>

              </>:null}
          </Pagination>
          <hr/>
          <LinkContainer to="/dashboard/admin/add_products">
            <Button
            variant="secondary"
            >
            Add Product
            </Button>
          </LinkContainer>
        </>
      ) : (
        <Loader />
      )}

      <Modal show={removeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>There is no going back</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{handleClose()}}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductsTable;
