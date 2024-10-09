import { useRoutes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";
import NotFoundRoutes from "./NotFoundRoutes";

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthRoutes, NotFoundRoutes]);
}