import React from "react";

import { FormHelperText, Grid, Stack, TextField } from "@mui/material";

const AppInput = ({
  id,
  name,
  label,
  type,
  value,
  handleBlur,
  handleChange,  
  touched,
  errors,
  disabled=false,
}) => {  
  return (
    <Grid item xs={12} width="100%">
      <Stack spacing={0.5}>        
        <TextField 
          id={id}
          type={type}
          value={value}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}            
          label={label}
          fullWidth
          error={Boolean(touched && errors)}
          variant="outlined"
          disabled={disabled} 
        />        
        {touched && errors && (
          <FormHelperText 
            error 
            id={`standard-weight-helper-text-${name}`}
          >
            {errors}
          </FormHelperText>
        )}
      </Stack>
    </Grid>
  )
}

export default AppInput;