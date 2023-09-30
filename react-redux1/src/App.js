import { useState, useEffect } from 'react';
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
// import { Header, Footer } from "./components/index"
// Pages
import {
  Contact,
  About,
  Home,
  Login,
  Register,
  Reset,
  NotFound, Dashboard,
  Admin,
  CreateCategory,
  CreateProduct,
  Users,
  Profile,
  Orders,
  CreateMil,
  CreateSmell,
  UploadImage
} from "./pages/index"

import BottumBar from './components/buttomBar/BottumBar';
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from './pages/layout/Layout';
import axios from 'axios';
import PrivateRoute from './customHooks/Route/PrivateRoute';
import AdminRouter from './customHooks/Route/AdminRouter';

function App() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('jwt'))
  return (

    <>
      <Toaster rtl toastOptions={{ style: { textAlign: "right" } }} />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* Private */}
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='orders' element={<Orders />} />
            
          </Route>
          {/* Private */}

          {/* Admin Private */}
          <Route path='/admin' element={<AdminRouter />}>
            <Route path='' element={<Admin />} />
            <Route path='create-category' element={<CreateCategory />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='users' element={<Users />} />
            <Route path='mil' element={<CreateMil />} />
            <Route path='smell' element={<CreateSmell />} />
            <Route path='gallery' element={<UploadImage />} />
          </Route>
          {/* Admin Private */}


          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
        <BottumBar />
        <br />
        <br />
      </Router>
    </>
  );

}

export default App;
