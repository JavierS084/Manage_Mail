import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMe } from "../auth/authSlice";
import Navigation from "../components/Navigation/Navigation";
import DependenciesPage from "../pages/DependenciesPage";
import {Home, NotFound} from "../pages";
import { DependenciesProvider } from "../context";
import MailTypeProvider from "../context/MailTypeContext";
import MailTypesPage from "../pages/MailTypesPage";

export default function AppRoutesMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    dispatch(getMe());
  }, [dispatch, isError, navigate]);

  return (
    <MailTypeProvider>
      <DependenciesProvider>
        <Navigation/>
      <div className="container pt-4">
          <Routes>
          <Route path="/dependencies" element={<DependenciesPage />} />
          <Route path="/mail-types" element={<MailTypesPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
             </div>
        </DependenciesProvider> 
    </MailTypeProvider>
  );
}
