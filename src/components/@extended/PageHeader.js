import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";

export const PageHeader = ({
  title,
  addUrl,
  addLabel,
  children
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: {xs: "start", sm: "center"},
        justifyContent: "space-between",
        width: "100%",
        gap: 1,
        mt: 2,
      }}
    >
      {title && (
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      )}
      <Stack direction={{xs: "column", sm: "row"}} spacing={2} alignItems="center">
        {children}
        {addUrl && (
          <Grid item flex={1} minWidth={"fit-content"}>
            <Typography 
              variant="h6"
              component={Link}
              to={addUrl}
              color="primary"
              sx={{ textDecoration: "none" }}                                        
            >
              {addLabel ? addLabel : "+ Add"}
            </Typography>
          </Grid>
        )}
      </Stack>
    </Box>
  )
}