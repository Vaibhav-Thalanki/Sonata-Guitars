import React, { useState } from "react";
import { Button } from "@mui/material";
import AuthForm from "./authForm";
import PreventSignInAsAuth from "hoc/preventSignInAsAuth";
const RegisterLogin = (props) => {
  const [formType, setFormType] = useState(false);
  const toggleFormType = () => {
    setFormType(!formType);
  };
  return (
    <PreventSignInAsAuth>
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            {formType ? (
              <>
                <h1>New Customers</h1>
                <p>
                  rem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the release of Letraset sheets
                  cont
                </p>
              </>
            ) : (
              <>
                <h1>Welcome Back</h1>
                <p>
                  um is that it has a more-or-less normal distribution of
                  letters, as opposed to using 'Content here, content here',
                  making it look like readable English. Many desktop publishing
                  packages and web page editors now use Lorem Ipsum as their
                  default model text, and a search for 'lorem ipsum' will
                  uncover many web sites still in their infancy. Various vers
                </p>
              </>
            )}
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                toggleFormType();
              }}
            >
                {formType? "Already Registered?":"Need to register"}
            </Button>
          </div>
          <div className="right">
            <h2>{formType? 'Register':'Sign in'}</h2>
            <AuthForm
                formType={formType}
                {...props}
            />
          </div>
        </div>
      </div>
    </div>
    </PreventSignInAsAuth>
  );
};
export default RegisterLogin;
