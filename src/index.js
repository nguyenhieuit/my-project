import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Blog from './component/blog/Blog';
import Blogdetail from './component/blog/Blogdetail';
import Home from './component/Home';
import Shop from './component/Shop';
import Cart from './component/Cart';
import Register from './component/member/Register';
import Login from './component/member/Login';
import Account from './component/member/Account';
import MyProduct from './component/member/edit_product/MyProduct';
import AddProduct from './component/member/edit_product/AddProduct';
import EditProduct from './component/member/edit_product/EditProduct';
import Product from './component/member/edit_product/Product';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/blog/blogdetail/:id' element={<Blogdetail />} />
        {/* <Route path='/home' element={<Home />}></Route> */}
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={<Account />} />
        <Route path='/myproduct' element={<MyProduct />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/editproduct/:id' element={<EditProduct />} />
        <Route path='/home/product/:id' element={<Product />} />
      </Routes>
    </App>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
