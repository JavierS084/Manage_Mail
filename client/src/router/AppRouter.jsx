
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import OtpInputPage from "../pages/auth/OtpInputPage";

import AppRoutesMail from "./AppRoutesMail";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/*" element={<AppRoutesMail/>} />
        <Route path="/" element={<Login />} />
        <Route path="/verification-otp" element={<OtpInputPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;