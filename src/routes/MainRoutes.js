import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout";
import { appConstants } from "redux/constants";

const Dashboard = Loadable(lazy(() => import("pages/dashboard")));
const Profile = Loadable(lazy(() => import("pages/profile")));

const PrivateRoute = ({ children }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { redirect } = useSelector(state => state.app);
  const { userLoading, isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
      dispatch({
        type: appConstants.SET_REDIRECT,
        payload: ""
      });
    }
  }, [redirect, navigate, dispatch]);

  return !userLoading && 
    (!isAuthenticated ? 
      <Navigate to={`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`} />
    : children); 
};

const MainRoutes = {
  path: "/",
  element: <PrivateRoute><MainLayout/></PrivateRoute>,
  children: [
    {
      path: "/",
      element: <Dashboard/>
    },
    {
      path: "profile",
      children: [
        {
          path: "",
          element: <Profile/>
        },
        {
          path: "edit",
          element: <Profile/>
        }
      ]
    }, 
  ]
};

export default MainRoutes;