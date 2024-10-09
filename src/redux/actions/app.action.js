import { appConstants } from "redux/constants";
import Axios from "utils/axios";
import { loadUser } from "./user.action";

export const verifyOTP = (uid, form) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.VERIFY_OTP_REQUEST });
      const { data } = await Axios.post(`/auth/verify-otp?uid=${uid}`, form);
      dispatch({ type: appConstants.VERIFY_OTP_SUCCESS, payload: data.message });
      dispatch(loadUser());      
    }catch(error){      
      dispatch({ 
        type: appConstants.VERIFY_OTP_FAILURE,
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
