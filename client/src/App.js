import React from 'react'
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagesnotfound from './pages/Pagesnotfound'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import Forgetpassword from './pages/auth/Forgetpassword'
import Reset from './pages/auth/Reset'
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import Products from './pages/admin/Products'
import UpdateProduct from './pages/admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/admin/AdminOrders'
const App = () => {
  return (
    <>
     <Routes>
     <Route exact path='/' element={<HomePage/>}/>
     <Route exact path='/search' element={<Search/>}/>
     <Route exact path='/product/:slug' element={<ProductDetails/>}/>
     <Route exact path='/categories' element={<Categories/>}/>
     <Route exact path='/cart' element={<CartPage/>}/>

     <Route exact path='/category/:slug' element={<CategoryProduct/>}/>

     <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard/user" element={<Dashboard />} />
          {/* <Route path="/dashboard/user" element={<Dashboard />} /> */}
          <Route path="/dashboard/user/orders" element={<Orders />} />
          <Route path="/dashboard/user/profile" element={<Profile/>} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
          <Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
          <Route path="/dashboard/admin/products" element={<Products />} />
          <Route path="/dashboard/admin/product/:slug" element={<UpdateProduct />} />
          <Route path="/dashboard/admin/orders" element={<AdminOrders />} />


          <Route path="/dashboard/admin/users" element={<Users />} />



          {/* <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} /> */}
        </Route>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Register/>}/>
      <Route exact path='/forgetpassword' element={<Forgetpassword/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path='/contact' element={<Contact/>}/>
      <Route exact path='/policy' element={<Policy/>}/>
      <Route exact path="/user/resetpassword/:token" element={<Reset/>}/>
      <Route exact path='*' element={<Pagesnotfound/>}/>
     </Routes>
    </>
  )
}

export default App
