import React,{useEffect, useState} from "react";
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import * as Yup from 'yup';
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const SearchBar = ({handleKeywords,resetFormAfter,defaultKeyword})=>{
    
    const [submit,setSubmit] = useState(false)
    let formik = useFormik({
        enableReinitialize: true,
        initialValues: {keywords:defaultKeyword},
        validationSchema: Yup.object({
            keywords: Yup.string().min(3,'Atleast 3 characters').max(200,'Search for less than 200')
        }),
        onSubmit:(values,{resetForm})=>{

            handleKeywords(values)
            setSubmit(true)
        
        }
    })


    const resetForm = ()=>{
        setSubmit(false)
        resetFormAfter(formik)
        formik.handleReset()
    }
    return <div className="container">
        <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div>
            <TextField
            
            style={{
                width:'100%',
            }}
            placeholder="Search for something"
            name="keywords"
            variant="outlined"
            {...formik.getFieldProps('keywords')
            }
            {...errorHelper(formik,'keywords')}
            ></TextField>
        </div>


        </form>
        {submit?
            <Button
                        className="mt-3"
                        variant="primary"
                        onClick={resetForm}
                    >
                        Reset search
                    </Button>
        
        :null}
        
        
    </div>
}

export default SearchBar