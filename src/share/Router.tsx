import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";
import NonAuthLayout from "../components/layout/NonAuthLayout";
import Home from "../page/Home";
import Category from "../page/Category";
import GameDetail from "../page/GameDetail";
import MyPage from "../page/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game-detail" element={<GameDetail />} />
          <Route path="/category" element={<Category />} />

          <Route element={<NonAuthLayout />}></Route>

          <Route element={<AuthLayout />}>
            <Route path="my-page" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
