import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";
import NonAuthLayout from "../components/layout/NonAuthLayout";
import Home from "../page/Home";
import Category from "../page/Category";
import GameDetail from "../page/GameDetail";
import MyPage from "../page/MyPage";
import GameUpload from "../page/GameUpload";
import Redirect from "../page/Redirect";
import SignUp from "../page/SignUp";
import AdminDashBoard from "../page/admin/AdminDashBoard";
import AdminGameLog from "../page/admin/AdminGameLog";
import AdminLayout from "../components/layout/AdminLayout";
import ResetPassword from "../page/ResetPassword";
import FullWidthLayout from "../components/layout/FullWidthLayout";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsOfService from "../components/TermsOfService";
import Footer from "../components/Footer";
import ProjectRecruitForm from "../components/communityComponents/TeamBuilding/TeamRecruit/RecruitForm";
import ProfileRegisterForm from "../components/communityComponents/TeamBuilding/Profile/ProfileRegisterForm";
import TeamBuilding from "../page/TeamBuilding";
import RecruitDetail from "../components/communityComponents/TeamBuilding/TeamRecruit/RecruitDetail";
import TeamBuildingProfile from "../page/TeamBuildingProfile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FullWidthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/community/team-building" element={<TeamBuilding />} />
          <Route path="/community/team-building/create" element={<ProjectRecruitForm />} />
          <Route path="/community/team-building/profile/create" element={<ProfileRegisterForm />} />
          <Route path="/community/team-building/profile/edit/:id" element={<ProfileRegisterForm />} />
          <Route path="/community/team-building/profile-detail/:id" element={<TeamBuildingProfile />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/game-detail" element={<GameDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/redirect/:service" element={<Redirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/community/team-building/team-recruit/:id" element={<RecruitDetail />} />
          <Route path="/community/team-building/team-recruit/edit/:id" element={<ProjectRecruitForm />} />
          <Route element={<NonAuthLayout />}></Route>

          <Route element={<AuthLayout />}>
            <Route path="game-upload" element={<GameUpload />} />
            <Route path="game-edit/:gameId" element={<GameUpload />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashBoard />} />
            <Route path="/admin/game-log" element={<AdminGameLog />} />
          </Route>
        </Route>

        <Route element={<FullWidthLayout />}>
          <Route path="my-page/:id" element={<MyPage />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default Router;
