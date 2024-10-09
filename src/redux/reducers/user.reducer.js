import { userConstants } from "redux/constants";

const initState = {
  user: null,
  isAuthenticated: false,
  userLoading: true,
  loading: false,
  error: null,  
  message: null  
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true
      };

    case userConstants.LOAD_USER_REQUEST:
      return{
        ...state,
        userLoading: true,
        isAuthenticated: false
      }

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };

    case userConstants.LOGIN_SUCCESS:
    case userConstants.LOAD_USER_SUCCESS:
      return{
        ...state,
        user: action.payload,
        isAuthenticated: true,        
        userLoading: false,
        loading: false,
      }

    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload
      };

    case userConstants.LOGOUT_SUCCESS:
      return{
        ...state,
        user: {},
        isAuthenticated: false,
        userLoading: false,
        loading: false,
        message: "Logged Out Successfully"
      }
  
    case userConstants.LOGIN_FAILURE:    
      return{
        ...state,
        loading: false,
        userLoading: false,
        isAuthenticated: false,
        user: {},
        error: action.payload
      }

    case userConstants.LOAD_USER_FAILURE:
      return{
        userLoading: false,
        isAuthenticated: false,
        user: {},           
      }   

    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case userConstants.LOGOUT_FAILURE:
      return{
        ...state,
        error: action.payload,
        userLoading: false,
      }

    case userConstants.RESET_ERROR_AND_MESSAGE:
      return{
        ...state,
        error: null,
        message: null        
      } 
      
    case userConstants.RESET:
      return {
        ...initState,
        userLoading: false,
      }

    default:
      return state;
  }
}

export default userReducer;