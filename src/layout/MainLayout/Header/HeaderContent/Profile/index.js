import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,  
  Grid,  
  Paper,
  Popper,  
  Stack,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";

import MainCard from "components/MainCard";
import Transitions from "components/@extended/Transitions";
import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";
import { logout } from "redux/actions";
import { generatePublicUrl } from "utils/utilities";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`
  };
}

const Profile = () => {
  
  const theme = useTheme();
  const dispatch = useDispatch();  
  const { user } = useSelector((state) => state.user);    
  
  const handleLogout = async () => {    
    dispatch(logout());
  };
  
  const anchorRef = useRef(null);      
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleSelectClick = (event) => {      
      if (event.target.tagName === "LI" && event.target.classList.contains("MuiMenuItem-root")) {
        event.stopPropagation();
      }
    };

    document.addEventListener("click", handleSelectClick);

    return () => {
      document.removeEventListener("click", handleSelectClick);
    };
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {      
    if (anchorRef.current && anchorRef.current.contains(event.target)) {      
      return;
    }   
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = "grey.300";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar 
            alt={user?.name}
            src={user?.image ? generatePublicUrl(user?.image) : user?.name.charAt(0)}
            sx={{ width: 32, height: 32, color: "primary.main", bgcolor: "primary.lighter", }} 
          />
          <Typography variant="subtitle1">
            {user?.name}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar 
                              alt={user?.name}
                              src={user?.image ? generatePublicUrl(user?.image) : user?.name.charAt(0)}
                              sx={{ width: 32, height: 32, color: "primary.main", bgcolor: "primary.lighter", }} 
                            />
                            <Stack>
                              <Typography variant="h6">
                                {user?.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {user?.email}
                              </Typography>                              
                            </Stack>
                          </Stack>
                        </Grid>                        
                      </Grid>                      
                    </CardContent>                    
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                            <Tab
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "capitalize"
                              }}
                              icon={<UserOutlined style={{ marginBottom: 0, marginRight: "10px" }} />}
                              label="Profile"
                              {...a11yProps(0)}
                            />
                            <Tab
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textTransform: "capitalize"
                              }}
                              icon={<SettingOutlined style={{ marginBottom: 0, marginRight: "10px" }} />}
                              label="Setting"
                              {...a11yProps(1)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab handleLogout={handleLogout} />
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <SettingTab />
                        </TabPanel>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;