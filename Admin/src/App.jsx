import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import User from './Components/User/User'
import Order from './Components/Order/Order'
import ProductList from './Components/Product/ProductList'
import ProductCategory from './Components/Product/ProductCategory'
import Layout from './Components/Layout/Layout'
import Login from './Pages/Login'
import ProtectedRoutes from './Utils/ProtectedRoutes'

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Layout />
          </ProtectedRoutes>
        }
      >
        {/* Default Route: Dashboard */}
        <Route index  element={<Dashboard />} />

        {/* Nested Routes */}
        <Route path="product/list" element={<ProductList />} />
        <Route path="product/category" element={<ProductCategory />} />
        <Route path="order" element={<Order />} />
        <Route path="user" element={<User />} />
      </Route>

      {/* Catch-all route to redirect unknown paths */}
      {/* <Route path="*" element={<Login />} /> */}
    </Routes>
  )
}

export default App
