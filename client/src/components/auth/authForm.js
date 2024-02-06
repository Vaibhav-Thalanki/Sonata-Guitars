import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "utils/loader";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { userRegister, userLogin } from "store/actions/user.actions";
import { errorHelper } from "utils/tools";
import { useNavigate } from "react-router-dom";

const AuthForm = (props) => {
    const notification = useSelector(state=>state.notifications)
  const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "vtempvv@gmail.com", password: "testing123" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("This is an invalid email"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    if (props.formType) {
      //register
        dispatch(userRegister(values))
    } else {
      //sign in
      dispatch(userLogin(values))
    }
  };
  useEffect(()=>{
    
    if(notification && notification.success){
        navigate('/dashboard')
    }
    else{
        setLoading(false)
    }
  },[notification,props.history,navigate])

  return (
    <>
      <div className="auth_container">
        {loading ? (
          <Loader />
        ) : (
          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Enter your email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                {...errorHelper(formik, "email")}
              />
            </div>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="password"
                label="Enter your password"
                variant="outlined"
                type="password"
                {...formik.getFieldProps("password")}
                {...errorHelper(formik, "password")}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="small"
            >
              {props.formType ? "Register" : "Log In"}
            </Button>
          </form>
        )}
      </div>
    </>
  );
};

export default AuthForm;
