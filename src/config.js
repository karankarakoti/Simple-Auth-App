const config = {
  defaultPath: "/",
  fontFamily: `"Public Sans", sans-serif`,
  i18n: "en",
  miniDrawer: false,
  container: true,
  mode: "light",
  presetColor: "default",
  themeDirection: "ltr"
};

export default config;
export const drawerWidth = 260;

const host = window.location.hostname;
let apiURL = host === "localhost" ? "http://localhost:2000" : process.env.REACT_APP_API_URL;

export const apiConfig = {    
  "API_BASE_URL": apiURL,  
  "API_URL": apiURL + "/api/v1", 
  "MEDIA_URL": apiURL + "/media",  
}