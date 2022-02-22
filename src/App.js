import React from 'react'
import { HomePage } from './pages/homePage'
import { LoginForm } from './pages/loginForm'
import { RegisterForm } from './pages/registerForm'
import { OrdersForm } from './pages/ordersForm'
import { ResetForm } from './pages/resetForm'
import { AdminForm } from './pages/adminForm'
import { AddCategoryForm } from './pages/addCategoryForm'
import { AddItemForm } from './pages/addItemForm'
import { UpdateItemForm } from './pages/updateItemForm'
import { DeleteItemForm } from './pages/deleteItemForm'
import { ShoppingCartForm } from './pages/shoppingCartForm'
import { Routes, Route } from 'react-router-dom'
import { routes } from './config/routes'
import { AdminGuard } from './hoc/adminGuard'
import { UserGuard } from './hoc/userGuard'
import { AuthContextProvider } from './context/authContextProvider'
import { CartContextProvider } from './context/cartContextProvider'
import { ProductCardDesktop } from './components/productCardDesktop'
import { ContentHomePage } from './components/contentHomePage'
import 'antd/dist/antd.css'

export const App = () => {
  return (
    <Routes>
      <Route
        path={routes.homePage}
        element={
          <AuthContextProvider>
            <CartContextProvider>
              <HomePage />
            </CartContextProvider>
          </AuthContextProvider>
        }
      >
        {/* <Route path="/:id" element={<ContentHomePage />} /> */}
      </Route>

      <Route
        path="item/:id"
        element={
          <CartContextProvider>
            <ProductCardDesktop />
          </CartContextProvider>
        }
      />
      <Route
        path={routes.shoppingCart}
        element={
          <AuthContextProvider>
            <CartContextProvider>
              <ShoppingCartForm />
            </CartContextProvider>
          </AuthContextProvider>
        }
      />

      <Route path={routes.login} element={<LoginForm />} />
      <Route path={routes.register} element={<RegisterForm />} />
      <Route path={routes.reset} element={<ResetForm />} />
      <Route
        path={routes.orders}
        element={
          <AuthContextProvider>
            <UserGuard>
              <OrdersForm />
            </UserGuard>
          </AuthContextProvider>
        }
      />

      <Route
        path={routes.admin}
        element={
          <AuthContextProvider>
            <AdminGuard>
              <AdminForm />
            </AdminGuard>
          </AuthContextProvider>
        }
      />
      <Route
        path={routes.addCategory}
        element={
          <AuthContextProvider>
            <AdminGuard>
              <AddCategoryForm />
            </AdminGuard>
          </AuthContextProvider>
        }
      />
      <Route
        path={routes.addItem}
        element={
          <AuthContextProvider>
            <AdminGuard>
              <AddItemForm />
            </AdminGuard>
          </AuthContextProvider>
        }
      />
      <Route
        path={routes.updateItem}
        element={
          <AuthContextProvider>
            <AdminGuard>
              <UpdateItemForm />
            </AdminGuard>
          </AuthContextProvider>
        }
      />
      <Route
        path={routes.deleteItem}
        element={
          <AuthContextProvider>
            <AdminGuard>
              <DeleteItemForm />
            </AdminGuard>
          </AuthContextProvider>
        }
      />
    </Routes>
  )
}
