import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,    
  Grid,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";

import AppInput from "components/Input/AppInput";
import AppInputPassword from "components/Input/AppInputPassword";
import AnimateButton from "components/@extended/AnimateButton";
import { login } from "redux/actions";

const AuthLogin = () => {  

  const urlParams = new URLSearchParams(window.location.search);  
  const redirect = urlParams.get("redirect");  
  const dispatch = useDispatch();   

  const onSubmit = async (values, { setSubmitting }) => {            
    setSubmitting(true);
    dispatch(login(values.email, values.password, redirect));    
    values.password = "";
    setSubmitting(false);          
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",          
        }}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
            password: Yup.string().max(255).required("Password is required")
          })
        }
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AppInput
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.email}
                  errors={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <AppInputPassword
                  id="password"
                  label="Password"                  
                  value={values.password}
                  name="password"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.password}
                  errors={errors.password}
                  showStrength={false}                  
                />  
              </Grid>
              
              <Grid item xs={12}>
                <AnimateButton>
                  <Button 
                    disableElevation 
                    disabled={isSubmitting} 
                    fullWidth 
                    size="large" 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>              
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;