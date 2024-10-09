import { menuConstants } from "redux/constants";

const initState = {
  openItem: ["dashboard"],
  defaultId: "dashboard",
  openComponent: "buttons",
  drawerOpen: false,
  componentDrawerOpen: true
};

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case menuConstants.ACTIVE_ITEM:
      return { ...state, openItem: action.payload.openItem };

    case menuConstants.ACTIVE_COMPONENT:
      return { ...state, openComponent: action.payload.openComponent };

    case menuConstants.OPEN_DRAWER:
      return { ...state, drawerOpen: action.payload.drawerOpen };

    case menuConstants.OPEN_COMPONENT_DRAWER:
      return { ...state, componentDrawerOpen: action.payload.componentDrawerOpen };

    default:
      return state;
  }
};

export default menuReducer;