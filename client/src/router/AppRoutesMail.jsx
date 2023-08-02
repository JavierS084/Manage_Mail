import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMe } from "../auth/authSlice";
import Navigation from "../components/Navigation/Navigation";
import DependenciesPage from "../pages/DependenciesPage";
import {Home, NotFound} from "../pages";
import { DependenciesProvider } from "../context";

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
    <>
      <Navigation />
      <div className="container pt-4">
        <DependenciesProvider>
          <Routes>
          <Route path="/dependencies" element={<DependenciesPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </DependenciesProvider>
      </div>
    </>
  );
}
