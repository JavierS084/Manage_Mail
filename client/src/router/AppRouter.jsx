import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";

import { AdministrationsProvider } from "../context";

import AppRoutesMail from "./AppRoutesMail";
import ResetPasswordPage from "../pages/auth/ResetPassword";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AdministrationsProvider>
        <Routes>
          <Route path="/*" element={<AppRoutesMail />} />
          <Route path="/" element={<Login />} />
          <Route path="/reset-password/:uuid" element={<ResetPasswordPage />} />
        </Routes>
      </AdministrationsProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
