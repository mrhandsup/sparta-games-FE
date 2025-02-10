import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";
import NonAuthLayout from "../components/layout/NonAuthLayout";
import Home from "../page/Home";
import Category from "../page/Category";
import GameDetail from "../page/GameDetail";
import MyPage from "../page/MyPage";
import Community from "../page/Community";
import GameUpload from "../page/GameUpload";
import Redirect from "../page/Redirect";
import SignUp from "../page/SignUp";
import AdminDashBoard from "../page/admin/AdminDashBoard";
import AdminGameLog from "../page/admin/AdminGameLog";
import AdminLayout from "../components/layout/AdminLayout";
import ResetPassword from "../page/ResetPassword";
import HomeLayout from "../components/layout/HomeLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/game-detail" element={<GameDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/community" element={<Community />} />
          <Route path="/redirect/:service" element={<Redirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route element={<NonAuthLayout />}></Route>

          <Route element={<AuthLayout />}>
            <Route path="my-page/:id" element={<MyPage />} />
            <Route path="game-upload" element={<GameUpload />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path="/admin/game-log" element={<AdminGameLog />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
