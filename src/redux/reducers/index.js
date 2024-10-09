import { combineReducers } from "redux";

import menuReducer from "./menu.reducer";
import userReducer from "./user.reducer";
import appReducer from "./app.reducer";

const rootReducer = combineReducers({  
  app: appReducer,
  menu: menuReducer,
  user: userReducer,
});

export default rootReducer;