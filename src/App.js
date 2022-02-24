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
import { UserGuard } from './hoc/userGuard'
import { AuthContextProvider } from './context/authContextProvider'
import { CartContextProvider } from './context/cartContextProvider'
import { SearchContextProvider } from './context/searchContextProvider'
import { ProductCardDesktop } from './components/productCardDesktop'
import { ContentHomePage } from './components/contentHomePage'
import { LandingHomepage } from './components/landingHomePage'
import 'antd/dist/antd.css'

export const App = () => {
  return (
    <Routes>
      <Route
        path={routes.homePage}
        element={
          <AuthContextProvider>
            <CartContextProvider>
              <SearchContextProvider>
                <HomePage />
              </SearchContextProvider>
            </CartContextProvider>
          </AuthContextProvider>
        }
      >
        <Route index element={<LandingHomepage />} />
        <Route path="/:id" element={<ContentHomePage />} />
        <Route path="/:id/:subId" element={<ContentHomePage />} />
        <Route path="product/:id" element={<ProductCardDesktop />} />
      </Route>

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
            <UserGuard admin>
              <AdminForm />
            </UserGuard>
          </AuthContextProvider>
        }
      />
      <Route
        path={routes.addCategory}
        element={
          <AuthContextProvider>
            <UserGuard admin>
              <AddCategoryForm />
            </UserGuard>
          </AuthContextProvider>
        }
      />
      <Route
        path={routes.addItem}
        element={
          <AuthContextProvider>
            <UserGuard admin>
              <AddItemForm />
            </UserGuard>
          </AuthContextProvider>
        }
      />
      <Route
        path={routes.updateItem}
        element={
          <AuthContextProvider>
            <UserGuard admin>
              <UpdateItemForm />
            </UserGuard>
          </AuthContextProvider>
        }
      />
      <Route
        path={routes.deleteItem}
        element={
          <AuthContextProvider>
            <UserGuard admin>
              <DeleteItemForm />
            </UserGuard>
          </AuthContextProvider>
        }
      />
    </Routes>
  )
}
