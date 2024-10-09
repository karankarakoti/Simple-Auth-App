import React, { useEffect, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Box, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";

import {strengthColor, strengthIndicator } from "utils/password-strength";

const AppInputPassword = ({
  id,
  label,
  value,
  name,
  handleBlur,
  handleChange,
  touched,
  errors,
  showStrength=true 
}) => {

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);


  return (
    <Box
      width="100%"
    >
      <FormControl 
        variant="outlined"
        fullWidth
      >
        <InputLabel 
          htmlFor={id}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          id={id}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
          value={value}
          name={name}
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e);
            changePassword(e.target.value);
          }}
        />
        {touched && errors && (
          <FormHelperText 
            error 
            id={`standard-weight-helper-text-${name}`}
          >
            {errors}
          </FormHelperText>
        )}
      </FormControl>
      {showStrength && <FormControl fullWidth sx={{ mt: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: "7px" }} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" fontSize="0.75rem">
              {level?.label}
            </Typography>
          </Grid>
        </Grid>
      </FormControl>}
    </Box>
  )
}

export default AppInputPassword;