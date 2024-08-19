import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../page/Home";
import GameDetail from "../page/GameDetail";
import NonAuthLayout from "../components/layout/NonAuthLayout";
import AuthLayout from "../components/layout/AuthLayout";
import MyPage from "../page/MyPage";
import Layout from "../components/layout/Layout";
import Community from "../page/Community";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game-detail" element={<GameDetail />} />

          <Route element={<NonAuthLayout />}>
            <Route path="/community" element={<Community />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="my-page" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
