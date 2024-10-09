import React from "react";
import { Formik } from "formik";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Button, FormHelperText, Grid, Typography } from "@mui/material";

import AnimateButton from "components/@extended/AnimateButton";
import { verifyOTP } from "redux/actions";

const AuthOTP = () => {

  const urlParams = new URLSearchParams(window.location.search);  
  const uid = urlParams.get("uid");    
  const dispatch = useDispatch();

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const form = {
      otp: values.otp
    }
    setSubmitting(true);
    dispatch(verifyOTP(uid, form));
    resetForm();
    setSubmitting(false);          
  }

  return (
    <>
      <Formik
        initialValues={{
          otp: ""
        }}
        validationSchema={
          Yup.object().shape({
            otp: Yup.string().required("OTP is required").length(6, "OTP must be 6 characters long")
          })
        }
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Typography
              variant="subtitle2"
              gutterBottom
            >
              Please enter the OTP sent to your email address
            </Typography>   
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <OTPInput
                  value={values.otp}
                  onChange={code => {{                    
                    setFieldValue("otp", code)                    
                  }}}
                  numInputs={6}
                  renderSeparator={<span style={{ width: "8px" }}></span>}
                  renderInput={(props) => <input 
                    {...props} 
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      width: "54px",
                      height: "54px",
                      fontSize: "24px",
                      textAlign: "center",
                      color: "#000",
                      fontWeight: "400",
                      caretColor: "blue",                      
                      outline: "none",
                    }}                    
                  />}                  
                />
                {touched.otp && errors.otp && (
                  <FormHelperText 
                    error 
                    id={`standard-weight-helper-text-otp`}
                    sx={{ mt: 1 }}
                  >
                    {errors.otp}
                  </FormHelperText>
                )}
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
                    Verify OTP
                  </Button>
                </AnimateButton>
              </Grid>                        
            </Grid>
          </form>
        )}
      </Formik>         
    </>
  )
}

export default AuthOTP;