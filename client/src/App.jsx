import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import 'antd/dist/antd.css';
import { Spin } from 'antd';

import { Layout } from 'antd';

import { useGetUserQuery } from './queries/user'

import './App.css'
import CatalogPage from "./pages/Catalog";
import DealPage from "./pages/Deal";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { useEffect } from "react";
import Header from "./components/Header";
import Sider from "./components/Sider";
import ProfilePage from "./pages/Profile";

const { Content } = Layout;

function App() {
  const navigate = useNavigate();
  const location = useLocation()

  let {data: user, isLoading, isError} = useGetUserQuery()

  user = isError ? undefined : user

  useEffect(() => {
    if (isError && !location.pathname.includes('login') & !location.pathname.includes('register')) {
      navigate('/login')
    }
  }, [isError, isLoading, location.pathname, navigate, user])

  if (isLoading) {
    return <Spin className="main-spinner" size="large" />
  }

  return (
    <Layout className="root-layout">
      <Header user={user} />
      <Layout>
        <Sider user={user} />
        <Content className="content">
          <Routes>
            <Route path="/" element={<CatalogPage user={user} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/deal/:id" element={<DealPage user={user} />} />
            <Route path="/login" element={<LoginPage user={user} />} />
            <Route path="/register" element={<RegisterPage user={user} />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
