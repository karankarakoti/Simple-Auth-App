import { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from "@mui/material";
import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from "@ant-design/icons";

import MainCard from "components/MainCard";
import Transitions from "components/@extended/Transitions";

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem"
};

const actionSX = {
  mt: "6px",
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none"
};

const Notifications = [
  {
    color: "success.main",
    bgColor: "success.lighter",
    Icon: <GiftOutlined />,
    time: "3:00 AM",
    title: "It's Cristina danny's birthday today.",
    subtitle: "2 min ago",    
  },
  {
    color: "primary.main",
    bgColor: "primary.lighter",
    Icon: <MessageOutlined />,
    time: "6:00 PM",
    title: "Aida Burg commented your post.",
    subtitle: "5 August",    
  },
  {
    color: "error.main",
    bgColor: "error.lighter",
    Icon: <SettingOutlined />,
    time: "2:45 PM",
    title: "Your Profile is Complete 60%",
    subtitle: "7 hours ago",    
  },
  {
    color: "primary.main",
    bgColor: "primary.lighter",
    Icon: "C",
    time: "9:10 PM",
    title: "Cristina Danny invited to join Meeting.",
    subtitle: "Daily scrum meeting time",
    isLast: true    
  }
]

const Notification = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = "grey.300";
  const iconBackColor = "grey.100";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: "text.primary", bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={4} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
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
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: "100%",
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down("md")]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      "& .MuiListItemButton-root": {
                        py: 0.5,
                        "& .MuiAvatar-root": avatarSX,
                        "& .MuiListItemSecondaryAction-root": { ...actionSX, position: "relative" }
                      }
                    }}
                  >
                    {Notifications.map((item, index) => (
                      <NotificationItem
                        key={index}
                        color={item.color}
                        bgColor={item.bgColor}
                        Icon={item.Icon}
                        time={item.time}
                        title={item.title}
                        subtitle={item.subtitle}
                      />
                    ))}
                    <ListItemButton sx={{ textAlign: "center", py: `${12}px !important` }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

const NotificationItem = ({
  color,
  bgColor,
  Icon,
  time,
  title,
  subtitle,  
}) => (
  <>
    <ListItemButton>
      <ListItemAvatar>
        <Avatar
          sx={{
            color: color,
            bgcolor: bgColor
          }}
        >
          {Icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h6">
            {title}
          </Typography>
        }
        secondary={subtitle}
      />
      <ListItemSecondaryAction>
        <Typography variant="caption" noWrap>
          {time}
        </Typography>
      </ListItemSecondaryAction>
    </ListItemButton>
    <Divider />
  </>
)

export default Notification;