import { Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import AuthWrapper from "./AuthWrapper";
import AuthOTP from "./auth-forms/AuthOTP";

const OTP = () => (
  <AuthWrapper>    
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Verify OTP</Typography>          
          <Typography component={Link} to="/auth/login" variant="body1" sx={{ textDecoration: "none" }} color="primary">
            Back to Login
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthOTP/>
      </Grid>
    </Grid>     
  </AuthWrapper>
);

export default OTP;