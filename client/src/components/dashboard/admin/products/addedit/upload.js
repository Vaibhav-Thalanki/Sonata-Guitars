import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios from "axios";
import { getTokenCookie } from "utils/tools";
import Loader from "utils/loader";
import { useDispatch } from "react-redux";
import * as actions from '../../../../../store/actions';

const PicUpload = ({picValue}) =>{
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const formikImg = useFormik({
        initialValues:{ pic:''},
        validationSchema: Yup.object({
            pic: Yup.mixed().required('A file is required')
        }),
        onSubmit:(values)=>{
            setLoading(true);
            let formData = new FormData();
            formData.append("file", values.pic);

            axios.post(`/api/products/upload`,formData,{
                headers:{
                    'content-type':'multipart/form-data',
                    'Authorization':`Bearer ${getTokenCookie()}`
                }
            }).then( response => {
                picValue(response.data);
            }).catch(error =>{
                alert(error)
            }).finally(()=>{
                setLoading(false)
            });
        }
    })

    return(
        <>
            { loading ?
                <Loader/>
            :
            <Form onSubmit={(e)=>{e.preventDefault();formikImg.handleSubmit()}}>
                <Form.Group>
                    <Form.Control
                    type="file"
                        id="file"
                        name="file"
                        onChange={(event)=>{
                            formikImg.setFieldValue("pic", event.target.files[0])
                        }}
                    />
                    { formikImg.errors.pic && formikImg.touched.pic ?
                        <div>{formikImg.errors.pic}</div>
                        :null
                    }
                </Form.Group>
                <Button variant="secondary" type="submit" >
                    Add image
                </Button>
            </Form>
            }
        </>
    )

}

export default PicUpload;