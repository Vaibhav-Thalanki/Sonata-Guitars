import React,{useEffect, useState} from "react";
import { ArrowDropUp,ArrowDropDown } from "@mui/icons-material";
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import * as Yup from 'yup';

import { List, ListItem, ListItemText,Collapse, TextField, Button } from "@mui/material";

const RangeSelect = (props)=>{
    const [open,setOpen] = useState(props.initialState)
    
   
    const handleCollapseOpen =()=>{
        setOpen(!open)
    }
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{min:0,max:5000},
        validationSchema:Yup.object({
            min:Yup.number().min(0,'Minimum is 0'),
            max:Yup.number().max(10000,'Maximum is 10000')
        }),
        onSubmit:(values)=>{
            props.handleRange(values.min,values.max)
        }
    })
    return <div className="collapse_items_wrapper">
        <List>
            <ListItem onClick={handleCollapseOpen}>
            <ListItemText
                primary={props.title}
                className="collapse_title"
            />
                {open? <ArrowDropUp></ArrowDropUp>:<ArrowDropDown></ArrowDropDown>}
            </ListItem>
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <div>
                            <TextField
                            label="Minimum"
                             placeholder="Minimum"
                            name="min"
                            variant="outlined"
                            type="number"
            {...formik.getFieldProps('min')
            }
            {...errorHelper(formik,'min')}>

                            </TextField>
                        </div>
                        <div className="mt-3">
                            <TextField
                            label="Maximum"
                             placeholder="Maximum"
                            name="max"
                            variant="outlined"
                            type="number"
            {...formik.getFieldProps('max')
            }
            {...errorHelper(formik,'max')}>

                            </TextField>
                        </div>
                        <Button
                        type="submit"
                        className="mt-3"
                        variant="outlined"
                        color="secondary"
                        size="small">Search Range</Button>
                        </form>
                </List>
            </Collapse>
            
        </List>
    </div>
}

export default RangeSelect
