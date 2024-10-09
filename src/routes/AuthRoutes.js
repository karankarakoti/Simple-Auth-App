import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Loadable from "components/Loadable";
import MinimalLayout from "layout/MinimalLayout";
import { appConstants } from "redux/constants";

const AuthLogin = Loadable(lazy(() => import("pages/authentication/Login")));
const AuthRegister = Loadable(lazy(() => import("pages/authentication/Register")));
const AuthOTP = Loadable(lazy(() => import("pages/authentication/OTP")));

const NonPrivateRoute = ({ children }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { redirect } = useSelector(state => state.app);
  const { isAuthenticated, userLoading } = useSelector(state => state.user);

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
    (isAuthenticated ? 
      <Navigate to={`/`} />
    : children); 
}

const AuthRoutes = {
  path: "/auth/",
  element: <NonPrivateRoute><MinimalLayout/></NonPrivateRoute>,
  children: [
    {
      path: "login",
      element: <AuthLogin />
    },
    {
      path: "register",
      element: <AuthRegister />
    },
    {
      path: "verify-otp",
      element: <AuthOTP />
    }    
  ]
};

export default AuthRoutes;