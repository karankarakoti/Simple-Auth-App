import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

const nav = [
  {
    title: "Edit Profile",
    Icon: <EditOutlined />,
    url: "/profile?edit=true"    
  },
  {
    title: "View Profile",
    Icon: <UserOutlined />,
    url: "/profile"    
  }
]

const ProfileTab = ({ handleLogout }) => {

  const theme = useTheme(); 

  return (
    <List component="nav" sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32, color: theme.palette.grey[500] } }}>
      {nav.map((item, index) => (
        <ListItemButton
          key={index}
          component={Link}
          to={item.url}
        >
          <ListItemIcon>
            {item.Icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      ))}      
      <ListItemButton
        onClick={handleLogout}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;