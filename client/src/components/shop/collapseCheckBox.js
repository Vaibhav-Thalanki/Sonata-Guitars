import React,{useEffect, useState} from "react";
import { ArrowDropUp,ArrowDropDown } from "@mui/icons-material";
import { List, ListItem, ListItemSecondaryAction, ListItemText,Checkbox,Collapse, collapseClasses } from "@mui/material";

const CollapseCheckbox = (props)=>{
    const [open,setOpen] = useState(props.initialState)
    const [checked,setChecked]=useState([])
    useEffect(()=>{
        setChecked(props.update)
    },[props])
    const handleCollapseOpen =()=>{
        setOpen(!open)
    }
    const renderList = ()=>{
        return props.list?
        props.list.map(item=>(
            <ListItem key={item._id}>
                <ListItemText
                    primary={item.name}
                />
                <ListItemSecondaryAction>
                    <Checkbox
                        
                        color="secondary"
                        onChange={()=>handleToggle(item._id)}
                        checked={checked.indexOf(item._id)!==-1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        )
        )
        :null
    }
    const handleToggle = value =>{
        const currentindex = checked.indexOf(value)
        let newChecked = [...checked]
        if(currentindex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentindex,1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)

    }
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
                        {renderList()}
                </List>
            </Collapse>
            
        </List>
    </div>
}

export default CollapseCheckbox
