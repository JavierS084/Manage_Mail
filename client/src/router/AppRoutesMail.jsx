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
  MailsPage,
} from "../pages";
import {
  AdministrationsProvider,
  DependenciesProvider,
  MailTypesProvider,
  RequestsProvider,
  GroupsProvider,
  MailsProvider,
} from "../context";
import { AdministrationsForm, DependenciesForm, MailForm } from "../components";

export default function AppRoutesMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
    if (isError) {
      navigate("/");
    }
  }, [dispatch, isError, navigate]);

  return (
    <AdministrationsProvider>
      <MailsProvider>
        <GroupsProvider>
          <MailTypesProvider>
            <DependenciesProvider>
              <RequestsProvider>
                <Navigation />

                <Routes>
                  <Route
                    path="/administrations"
                    element={<AdministrationsPage />}
                  />
                  <Route path="/mails" element={<MailsPage />} />
                  <Route
                    path="/mail/edit/:id"
                    element={<MailForm/>}
                  />
                  <Route
                    path="/administrations/edit/:uuid"
                    element={<AdministrationsForm />}
                  />

                  <Route path="/dependencies" element={<DependenciesPage />} />
                  <Route
                    path="/dependency/edit/:id"
                    element={<DependenciesForm/>}
                  />

                  <Route path="/groups" element={<GroupsPage />} />
                  <Route path="/mail-types" element={<MailTypesPage />} />
                  <Route path="/requests" element={<RequestsPage />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </RequestsProvider>
            </DependenciesProvider>
          </MailTypesProvider>
        </GroupsProvider>
      </MailsProvider>
    </AdministrationsProvider>
  );
}
