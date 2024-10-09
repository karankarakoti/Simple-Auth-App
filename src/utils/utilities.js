import { apiConfig } from "config";

export const isMobile = () => (typeof window !== "undefined" ? window.innerWidth <= 600 : false);
export const isTab = () => (typeof window !== "undefined" ? window.innerWidth <= 1024 : false);

export const scrollToTop = (window) =>{
  window.scrollTo({top: 0, left: 0, behavior: "smooth" })
}    

export const getAssetURL = (filename) => {
  return "/assets/"+filename;
}

export const generatePublicUrl = (file) => {
  if(file?.includes("http") || file?.includes("https")) return file;
  if(file?.split("/").length > 1) return file;
  return apiConfig.MEDIA_URL + "/" + file
}