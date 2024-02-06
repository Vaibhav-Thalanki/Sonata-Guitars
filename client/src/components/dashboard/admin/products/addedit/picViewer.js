import React,{useState} from "react";
import { Modal, Button } from "react-bootstrap";

const PicViewer = ({formik,deletePic}) =>{
    const [idToDelete,setIdToDelete] = useState(null)
    const [show,setShow] = useState(false)
    const handleClose = () =>{
        setShow(false)
    }
    const handleShow =(i)=>{
        setIdToDelete(i)
        setShow(true)
    }
    const confirmDel = ()=>{
        deletePic(idToDelete)
        handleClose()
        setIdToDelete(null)
    }
    return <>
        {formik.values && formik.values.images?
        formik.values.images.map((item,i)=>{
            return <div
            key={item}
            className="pic_block"
            onClick={()=>handleShow(i)}
            style={{
                background:`url(${item})`
            }}>

            </div>
        })
        
        
        :null}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confrim Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={confirmDel}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default PicViewer