import { lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Loadable from "components/Loadable";
import MinimalLayout from "layout/MinimalLayout";

const NotFound = Loadable(lazy(() => import("pages/not-found")));

const CheckAuth = ({ children }) => {
  const { isAuthenticated, userLoading } = useSelector(state => state.user);
  return !userLoading && 
    (!isAuthenticated ? 
      <Navigate to={`/auth/login`} />
    : children); 
}

const NotFoundRoutes = {
  path: "*",
  element: <CheckAuth>
    <MinimalLayout/>
    <NotFound />    
  </CheckAuth>,  
};

export default NotFoundRoutes;