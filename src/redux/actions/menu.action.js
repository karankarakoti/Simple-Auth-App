import { menuConstants } from "redux/constants";

export const activeItem = (openItem) => {
  return async (dispatch) => {
    dispatch({
      type: menuConstants.ACTIVE_ITEM,
      payload: openItem
    });
  }
};

export const activeComponent = (openComponent) => {
  return async (dispatch) => {
    dispatch({
      type: menuConstants.ACTIVE_COMPONENT,
      payload: openComponent
    });
  }
}

export const openDrawer = (drawerOpen) => {
  return async (dispatch) => {
    dispatch({
      type: menuConstants.OPEN_DRAWER,
      payload: drawerOpen
    });
  }
}

export const openComponentDrawer = (componentDrawerOpen) => {
  return async (dispatch) => {
    dispatch({
      type: menuConstants.OPEN_COMPONENT_DRAWER,
      payload: componentDrawerOpen
    });
  }
}