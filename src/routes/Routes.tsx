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

export default () => {

  return (
    <Routes>
      <Route path="signin" element={<SignInScreen />} />
      <Route path="signup" element={<SignUpScreen />} />
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        <Route path="recomendaciones" element={<ProtectedRoute><RecommendationsScreen /></ProtectedRoute>} />
        <Route path="buscar" element={<ProtectedRoute><SearchScreen /></ProtectedRoute>} />
        <Route path="perfil" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
        <Route path="eventos/:id" element={<ProtectedRoute><EventScreen /></ProtectedRoute>} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
};
