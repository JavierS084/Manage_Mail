import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../auth/authSlice";
import Navigation from "../components/Navigation/Navigation";
import {Home, NotFound, DependenciesPage, MailTypesPage} from "../pages";
import { DependenciesProvider, MailTypeProvider} from "../context";


export default function AppRoutesMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError && !user) {
      navigate("/");
    }
    dispatch(getMe());
  }, [dispatch, isError]);

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
