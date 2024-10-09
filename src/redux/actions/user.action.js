import {   
  appConstants,
  userConstants
} from "redux/constants";
import Axios from "utils/axios";

export const login = (email, password, redirect) => {
  return async dispatch => {
    try{
      dispatch({ type: userConstants.LOGIN_REQUEST });      
      const { data } = await Axios.post(`/auth/login`, { email, password });            
      dispatch({ type: userConstants.LOGIN_SUCCESS, payload: data.data });      
      dispatch(loadUser());
      dispatch({ type: appConstants.SET_REDIRECT, payload: redirect });
    }catch(error){      
      dispatch({ 
        type: userConstants.LOGIN_FAILURE, 
        payload: error.response.data.error 
      });
      if(error.response.data?.data?.redirect){
        dispatch({ 
          type: appConstants.SET_REDIRECT, 
          payload: error.response.data?.data?.redirect
        });
      }
    }
  }
}

export const register = (form) => {
  return async dispatch => {
    try{
      dispatch({ type: userConstants.REGISTER_REQUEST });
      const { data } = await Axios.post(`/auth/register`, form);
      dispatch({ 
        type: userConstants.REGISTER_SUCCESS, 
        payload: data.message 
      });
      if(data.data?.redirect){
        dispatch({ 
          type: appConstants.SET_REDIRECT, 
          payload: data.data.redirect
        });
      }
    }catch(error){
      dispatch({ 
        type: userConstants.REGISTER_FAILURE, 
        payload: error.response.data.error 
      });
    }
  }
}

export const loadUser = () => {
  return async dispatch => {
    try{
      dispatch({ type: userConstants.LOAD_USER_REQUEST });
      const { data } = await Axios.get(`/auth/me`);           
      dispatch({ type: userConstants.LOAD_USER_SUCCESS, payload: data?.data });
    }catch(error){
      dispatch({ 
        type: userConstants.LOAD_USER_FAILURE, 
        payload: error.response.data?.error 
      });
    }
  }
}

export const logout = () => {
  return async dispatch => {
    try{      
      await Axios.get(`/auth/logout`);      
      dispatch({ type: userConstants.LOGOUT_SUCCESS });
      //RESET ALL REDUCERS              
      dispatch({ type: appConstants.RESET });
    }catch(error){
      dispatch({ 
        type: userConstants.LOGOUT_FAILURE, 
        payload: error.response.data.error 
      });
    }
  }
}