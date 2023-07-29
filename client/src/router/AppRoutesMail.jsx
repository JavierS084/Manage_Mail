import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMe } from "../auth/authSlice";
import Navigation from "../components/Navigation/Navigation";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

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
     <Navigation/>
      <div className="container pt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
