import { Outlet, Route, Routes } from "react-router-dom";
import Layout from "../components/general/Layout";
import EventScreen from "./screens/EventScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecommendationsScreen from "./screens/RecommendationsScreen";
import SearchScreen from "./screens/SearchScreen";
import SignInScreen from "./screens/SignInScreen";

export default () => {
  return (
    <Routes>
      <Route path="signin" element={<SignInScreen />} />
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="recomendaciones" element={<RecommendationsScreen />} />
        <Route path="buscar" element={<SearchScreen />} />
        <Route path="perfil" element={<ProfileScreen />} />
        <Route path="eventos/:id" element={<EventScreen />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
};
