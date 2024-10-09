import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CommentOutlined, LockOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const nav = [
  {
    title: "Support",
    Icon: <QuestionCircleOutlined />,
    url: "/support"
  },
  {
    title: "Privacy Center",
    Icon: <LockOutlined />,
    url: "/privacy-center"
  },
  {
    title: "Feedback",
    Icon: <CommentOutlined />,
    url: "/feedback"
  }
]

const SettingTab = () => {

  const theme = useTheme(); 

  return (
    <List component="nav" sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32, color: theme.palette.grey[500] } }}>
      {nav?.map((item, index) => (
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
    </List>
  );
};

export default SettingTab;