import React, { useEffect, useReducer } from 'react';
import Header from '../Components/Layout/Header';
import Footer from '../Components/Layout/Footer';
import { AccessDenied, AuthenticationTest, AuthenticationTestAdmin, Home, MenuItemDetails, NotFound } from '../Pages';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetShoppingCartQuery } from '../Api/shoppingCartApi';
import { setShoppingCart } from '../Storage/Redux/shoppingCartslice';
import ShoppingCart from '../Components/Page/ShoppingCart';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import jwtDecode from 'jwt-decode';
import { UserModel } from '../Interfaces';
import { setLoggedUser } from '../Storage/Redux/userAuthSlice';
import { RootState } from '../Storage/Redux/store';

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userAuthStore)
  const {data, isLoading} = useGetShoppingCartQuery(userData.id);
  
  useEffect(()=>{
    if(!isLoading){
      console.log(data.result)
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  },[data]);

  useEffect(()=>{
    const localToken = localStorage.getItem("token")
    if(localToken){
      const { fullName, id, email, role }: UserModel = jwtDecode(localToken);
      dispatch(setLoggedUser({fullName, id, email, role}))
    }
  }, [])


  
  return (
  <div className="text-success">
    <Header />
    <div className='pb-5'>
      <Routes>
        <Route path="/" element={<Home />}></Route> 
        <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />}></Route>   
        <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/authentication" element={<AuthenticationTest />}></Route>
        <Route path="/authorization" element={<AuthenticationTestAdmin />}></Route>
        <Route path="/accessDenied" element={<AccessDenied />}></Route>
        <Route path="*" element={<NotFound />}></Route> 
      </Routes>
    </div>
    <Footer />
    </div>)

}

export default App;
