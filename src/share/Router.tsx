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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game-detail" element={<GameDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/community" element={<Community />} />
          <Route path="/redirect/:service" element={<Redirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<NonAuthLayout />}></Route>

          <Route element={<AuthLayout />}>
            <Route path="my-page" element={<MyPage />} />
            <Route path="game-upload" element={<GameUpload />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
