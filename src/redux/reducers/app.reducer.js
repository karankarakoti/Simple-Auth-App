import { appConstants } from "redux/constants";

const initState = {
  loading: false,
  error: null,
  message: null,  
};

const appReducer = (state = initState, action) => {  
  switch (action.type) {           
    case appConstants.SET_REDIRECT:
      return {
        ...state,
        redirect: action.payload
      }

    case appConstants.VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true
      }

    case appConstants.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload
      }

    case appConstants.VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
       
    case appConstants.RESET_ERROR_AND_MESSAGE:
      return{
        ...state,
        error: null,
        message: null        
      } 
      
    case appConstants.RESET:
      return {
        ...initState,        
      }

    default:
      return state;
  }
};

export default appReducer;