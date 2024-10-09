import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { Grid, Typography } from "@mui/material";

import MainCard from "../MainCard";

const Breadcrumbs = ({ navigation, title, ...others }) => {
  
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();
 
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        if (collapse.type && collapse.type === "collapse") {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (location.pathname === collapse.url) {            
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === "group") {
        getCollapse(menu);
      }
      return false;
    });
  });  

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = "";
  
  if (main && main.type === "collapse") {
    mainContent = (
      <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: "none" }} color="textSecondary">
        {main.title}
      </Typography>
    );
  }
  
  if (item && item.type === "item") {
    itemTitle = item.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );
   
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: "transparent" }} {...others} content={false}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: "none" }}>
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>            
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool
};

export default Breadcrumbs;