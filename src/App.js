import React from 'react'
import { HomePage } from './pages/homePage'
import { LoginForm } from './pages/loginForm'
import { RegisterForm } from './pages/registerForm'
import { ResetForm } from './pages/resetForm'
import { AdminForm } from './pages/adminForm'
import { AddCategoryForm } from './pages/addCategoryForm'
import { AddItemForm } from './pages/addItemForm'
import { UpdateItemForm } from './pages/updateItemForm'
import { DeleteItemForm } from './pages/deleteItemForm'
import { Routes, Route } from 'react-router-dom'
import { routes } from './config/routes'
import { RequireAuth } from './hoc/requireAuth'
import { AuthProvider } from './hoc/authProvider'
import 'antd/dist/antd.css'

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={routes.homePage} element={<HomePage />} />
        <Route path={routes.login} element={<LoginForm />} />
        <Route path={routes.register} element={<RegisterForm />} />
        <Route path={routes.reset} element={<ResetForm />} />

        <Route
          path={routes.admin}
          element={
            <RequireAuth>
              <AdminForm />
            </RequireAuth>
          }
        />
        <Route
          path={routes.addCategory}
          element={
            <RequireAuth>
              <AddCategoryForm />
            </RequireAuth>
          }
        />
        <Route
          path={routes.addItem}
          element={
            <RequireAuth>
              <AddItemForm />
            </RequireAuth>
          }
        />
        <Route
          path={routes.updateItem}
          element={
            <RequireAuth>
              <UpdateItemForm />
            </RequireAuth>
          }
        />
        <Route
          path={routes.deleteItem}
          element={
            <RequireAuth>
              <DeleteItemForm />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
