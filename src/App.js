import React from 'react';
import { LoginPage } from './pages/loginPage';
import { RegisterPage } from './pages/registerPage';
import { HomePage } from './pages/homePage';
import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route exact path='/login' element={<LoginPage />} />
      <Route exact path='/register' element={<RegisterPage />} />
    </Routes>
  )
}


