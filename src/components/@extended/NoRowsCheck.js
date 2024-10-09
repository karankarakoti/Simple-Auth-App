import React from "react";
import { Box } from "@mui/material";

const NoRowsCheck = ({
  rows,
  children,
}) => {
  return (
    <>
      {rows.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            color: "text.disabled",
            marginTop: "20px"
          }}
        >
          No data found to display!
        </Box>
      ) : (
        <Box>
          {children}
        </Box>
      )}
    </>
  )
}

export default NoRowsCheck;