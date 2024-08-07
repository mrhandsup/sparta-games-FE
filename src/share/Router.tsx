import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import GameDetail from '../page/GameDetail';
import NonAuthLayout from '../components/layout/NonAuthLayout';
import AuthLayout from '../components/layout/AuthLayout';
import MyPage from '../page/MyPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game-detail" element={<GameDetail />} />

        <Route element={<NonAuthLayout />}></Route>

        <Route element={<AuthLayout />}>
          <Route path="my-page" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
