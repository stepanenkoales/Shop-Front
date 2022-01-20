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
import { AdminGuard } from './hoc/adminGuard'
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
            <AdminGuard>
              <AdminForm />
            </AdminGuard>
          }
        />
        <Route
          path={routes.addCategory}
          element={
            <AdminGuard>
              <AddCategoryForm />
            </AdminGuard>
          }
        />
        <Route
          path={routes.addItem}
          element={
            <AdminGuard>
              <AddItemForm />
            </AdminGuard>
          }
        />
        <Route
          path={routes.updateItem}
          element={
            <AdminGuard>
              <UpdateItemForm />
            </AdminGuard>
          }
        />
        <Route
          path={routes.deleteItem}
          element={
            <AdminGuard>
              <DeleteItemForm />
            </AdminGuard>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
