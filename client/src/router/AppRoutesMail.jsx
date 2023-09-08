import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../auth/authSlice";
import Navigation from "../components/Navigation/Navigation";
import { Home, NotFound, DependenciesPage, MailTypesPage, RequestsPage} from "../pages";
import {
  DependenciesProvider,
  MailTypesProvider,
  RequestsProvider,
} from "../context";

export default function AppRoutesMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user, msg } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError && !user) {
      navigate("/");
    }
    dispatch(getMe());
  }, [dispatch, isError]);

  console.log(msg);

  return (
    <MailTypesProvider>
      <DependenciesProvider>
        <RequestsProvider>
          <Navigation />
          <div className="container pt-4">
            <Routes>
              <Route path="/dependencies" element={<DependenciesPage />} />
              <Route path="/mail-types" element={<MailTypesPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </RequestsProvider>
      </DependenciesProvider>
    </MailTypesProvider>
  );
}
