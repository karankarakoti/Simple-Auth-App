import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import AnimateButton from "components/@extended/AnimateButton";
import AppInput from "components/Input/AppInput";
import AppInputPassword from "components/Input/AppInputPassword";
import { register } from "redux/actions";

const AuthRegister = () => {

  const dispatch = useDispatch();

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const form = {
      name: values.name,
      email: values.email,
      password: values.password
    }
    setSubmitting(true);
    dispatch(register(form));
    resetForm();
    setSubmitting(false);          
  }

  return (
    <>
      <Formik
        initialValues={{
          name: "",          
          email: "",          
          password: "",          
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Name is required"),          
          email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
          password: Yup.string().max(255).required("Password is required")
        })}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            < Grid item xs={12}>
                <AppInput
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  value={values.name}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.name}
                  errors={errors.name}
                />
              </Grid>
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
                    Create Account
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

export default AuthRegister;