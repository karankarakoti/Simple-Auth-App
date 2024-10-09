import { DashboardOutlined } from "@ant-design/icons";

const icons = {
  DashboardOutlined
};

const dashboard = {
  id: "dashboard",
  title: "Navigation",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/",
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    }
  ]
};

export default dashboard;