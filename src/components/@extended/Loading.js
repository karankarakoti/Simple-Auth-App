import { Box, Grid } from "@mui/material";
import React from "react";
import { ClipLoader } from "react-spinners"

export const Loading = ({
  loading
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        zIndex: "9999",
        animation: "fadeIn 0.5s;",
        display: loading ? "block" : "none"
      }}      
    >
      <Grid 
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.65)"      
        }}
      >
        <ClipLoader
          color={"#fff"}
          size={50}
        />        
      </Grid>
    </Box>
    )
}