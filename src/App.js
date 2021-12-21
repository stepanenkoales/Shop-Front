import React from 'react';
import { HomePage } from './pages/homePage';
import { LoginForm } from './pages/loginForm';
import { RegisterForm } from './pages/registerForm';
import { Routes, Route } from 'react-router-dom';
import { routes } from './config/routes';
import 'antd/dist/antd.css';

export const App = () => {
  return (
    <Routes>
      <Route path={routes.homepage} element={<HomePage />} />
      <Route exact path={routes.login} element={< LoginForm />} />
      <Route exact path={routes.register}  element={<RegisterForm />} />
    </Routes>
  )
}


