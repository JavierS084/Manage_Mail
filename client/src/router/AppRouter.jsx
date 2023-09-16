import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import OtpInputPage from "../pages/auth/OtpInputPage";
import { AdministrationsProvider } from "../context";

import AppRoutesMail from "./AppRoutesMail";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AdministrationsProvider>
        <Routes>
          <Route path="/*" element={<AppRoutesMail />} />
          <Route path="/" element={<Login />} />
          <Route path="/verification-otp" element={<OtpInputPage />} />
        </Routes>
      </AdministrationsProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
