import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../auth/authSlice";
import Navigation from "../components/Navigation/Navigation";
import {
  Home,
  NotFound,
  DependenciesPage,
  MailTypesPage,
  RequestsPage,
  GroupsPage,
  AdministrationsPage,
} from "../pages";
import {
  DependenciesProvider,
  MailTypesProvider,
  RequestsProvider,
  GroupsProvider,
} from "../context";

export default function AppRoutesMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
    if (isError) {
      navigate("/");
    }
  }, [dispatch, isError]);

  return (
    <GroupsProvider>
      <MailTypesProvider>
        <DependenciesProvider>
          <RequestsProvider>
            <Navigation />
            <div className="container pt-4">
              <Routes>
                <Route
                  path="/administrations"
                  element={<AdministrationsPage />}
                />
                 <Route
                  path="/administrations/edit/:uuid"
                  element={<AdministrationsPage />}
                />
                <Route path="/dependencies" element={<DependenciesPage />} />
                <Route path="/groups" element={<GroupsPage />} />
                <Route path="/mail-types" element={<MailTypesPage />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </div>
          </RequestsProvider>
        </DependenciesProvider>
      </MailTypesProvider>
    </GroupsProvider>
  );
}
