import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "../components/general/Layout";
import EventScreen from "./screens/EventScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecommendationsScreen from "./screens/RecommendationsScreen";
import SearchScreen from "./screens/SearchScreen";
import SignInScreen from "./screens/SignInScreen";
import ProtectedRoute from "../components/general/ProtectedRoute";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ReportesScreen from "./screens/ReportesScreen";
import ReporteScreen from "./screens/ReporteScreen";
import ProfileBeneficiadoScreen from "./screens/ProfileBeneficiadoScreen";
import UpdatePasswordModeradorScreen from "./screens/UpdateModeradorPasswordScreen";
import EventoBeneficiadoScreen from "./screens/EventoBeneficiadoScreen";
import SplashScreen from "./screens/SplashScreen";
import RecoverPassword from "./screens/RecoverPasswort";
import ProfileBeneficiadoByVoluntarioScreen from "./screens/ProfileBeneficiadoByVoluntarioScreen";
import { useAtomValue } from "jotai";
import userAtom from "../atoms/userAtom";
import NotFound from "./screens/404";

export default () => {
  const u = useAtomValue(userAtom);
  const userType =
    u === null
      ? "no-auth"
      : u["id_beneficiado" as keyof typeof u]
      ? "beneficiado"
      : u["id_voluntario" as keyof typeof u]
      ? "voluntario"
      : "moderador";

  console.log("user type", userType);

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="signin" element={<SignInScreen />} />
      <Route path="signup" element={<SignUpScreen />} />
      <Route path="recover-password" element={<RecoverPassword />} />
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-moderador-password/:id"
          element={<UpdatePasswordModeradorScreen />}
        />
        {userType === "voluntario" ? (
          <>
            <Route
              path="recomendaciones"
              element={
                <ProtectedRoute>
                  <RecommendationsScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="buscar"
              element={
                <ProtectedRoute>
                  <SearchScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="perfil"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="perfil-beneficiado-by-voluntario/:id"
              element={
                <ProtectedRoute>
                  <ProfileBeneficiadoByVoluntarioScreen />
                </ProtectedRoute>
              }
            />
          </>
        ) : null}

        {userType === "beneficiado" ? (
          <>
            <Route
              path="perfil-beneficiado"
              element={
                <ProtectedRoute>
                  <ProfileBeneficiadoScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="eventos-beneficiado/:id"
              element={
                <ProtectedRoute>
                  <EventoBeneficiadoScreen />
                </ProtectedRoute>
              }
            />
          </>
        ) : null}

        {userType === "moderador" ? (
          <>
            <Route
              path="reportes"
              element={
                <ProtectedRoute>
                  <ReportesScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="reportes/:id"
              element={
                <ProtectedRoute>
                  <ReporteScreen />
                </ProtectedRoute>
              }
            />
          </>
        ) : null}

        <Route
          path="eventos/:id"
          element={
            <ProtectedRoute>
              <EventScreen />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
