import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Loading } from "./@extended/Loading";
import {   
  appConstants,  
  userConstants 
} from "redux/constants";

const MessageAndErrors = () => {

  const dispatch = useDispatch();  
  const { message: appMsg, error: appErr, loading: appLoading } = useSelector(state => state.app);
  const { message: userMsg, error: userErr, loading: userLoading } = useSelector(state => state.user);

  useEffect(() => {    
    if(appMsg){
      toast.success(appMsg)
      dispatch({ type: appConstants.RESET_ERROR_AND_MESSAGE })
    }
    if(appErr){
      toast.error(appErr)
      dispatch({ type: appConstants.RESET_ERROR_AND_MESSAGE })
    }
    if(userMsg){
      toast.success(userMsg)
      dispatch({ type: userConstants.RESET_ERROR_AND_MESSAGE })
    }
    if(userErr){
      toast.error(userErr)
      dispatch({ type: userConstants.RESET_ERROR_AND_MESSAGE })
    }    
  }, [
    dispatch,
    appMsg, 
    appErr, 
    userMsg, 
    userErr
  ]);

  return (
    <>
      <ToastContainer         
        style={{ fontSize: "12px" }}  
        position="top-right"      
      />
      <Loading
        loading={          
          appLoading || 
          userLoading
        }
      />      
    </>
  )
}

export default MessageAndErrors;