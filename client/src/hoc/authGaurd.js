import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "utils/loader";

const AuthGaurd = (props)=>{
    const navigate = useNavigate()
    const [isAuth,setIsAuth] = useState(false)
    const users = useSelector(state=>state.users)
    useEffect(()=>{
        if(users.auth){
            setIsAuth(true)
        }
        else{
            navigate("/")
        }
    },[users,navigate])
    if(isAuth){
    return <>
        {React.cloneElement(props.children,{users})}
    </>
    }
    else{
        return <Loader full={true}/>
    }
}

export default AuthGaurd