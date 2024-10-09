import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Card, Grid, Stack, Typography } from "@mui/material";

import { generatePublicUrl } from "utils/utilities";

const Profile = () => {
  
  const { user } = useSelector(state => state.user);

  return (
    <Box>
      <Typography variant="h3" component="h1" sx={{ mt: 1, mb: 2 }}>
        My Profile
      </Typography>  
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={4}
          lg={3}          
        >
          <Card>
            <Stack
              alignItems="center"
              spacing={2}
              p={2}
            > 
              <Box
                position={"relative"}
              >
                <Avatar              
                  src={user?.image ? generatePublicUrl(user.image) : user?.name.charAt(0).toUpperCase()}
                  alt={user?.firstName}
                  sx={{ width: 120, height: 120, color: "primary.main", bgcolor: "primary.lighter", }} 
                />                               
              </Box>
              <Box
                textAlign={"center"}                
              >
                <Typography
                  variant="subtitle1"
                  fontSize={16}
                  fontWeight={600}                  
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight={400}
                >
                  {user?.email}
                </Typography>
              </Box>              

            </Stack>
          </Card>     
        </Grid>
        
      </Grid>       
    </Box>
  )
}

export default Profile