import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";

import Logo from "components/Logo";
import AuthFooter from "components/cards/AuthFooter";
import AuthBackground from "assets/images/auth/AuthBackground";

const NotFound = () => {  
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AuthBackground />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: "100vh"
        }}
      >
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: "calc(100vh - 180px)", md: "calc(100vh - 112px)"} }}
          >            
             <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',                
                maxWidth: '520px',
                mx: 'auto',
                px: { xs: 3, md: 0 },
              }}
            >
              <Typography variant="h1" sx={{ mb: 2 }}>
                404
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </Typography>
              <Button 
                variant="contained"
                component={Link}
                to="/"                
              >
                Back Home
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Box>
  );
}

NotFound.propTypes = {
  children: PropTypes.node
};

export default NotFound;