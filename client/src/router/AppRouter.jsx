
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

import AppRoutesMail from "./AppRoutesMail";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppRoutesMail/>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;