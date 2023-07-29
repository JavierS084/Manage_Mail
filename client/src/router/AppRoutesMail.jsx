import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMe } from "../auth/authSlice";
import  Head  from "../components/Navigation/Head";
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
      <Head/>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
   
      </Routes>
 
    
    </>
  );
}
