import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PreventSignInAsAuth = (props)=>{
    const users = useSelector(state=>state.users)
    const navigate = useNavigate()
    return <>
        {users.auth ? navigate('/dashboard'):props.children}
    </>
}

export default PreventSignInAsAuth