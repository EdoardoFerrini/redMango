import React, { useEffect } from 'react';
import Header from '../Components/Layout/Header';
import Footer from '../Components/Layout/Footer';
import { Home, MenuItemDetails, NotFound } from '../Pages';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetShoppingCartQuery } from '../Api/shoppingCartApi';
import { setShoppingCart } from '../Storage/Redux/shoppingCartslice';
import ShoppingCart from '../Components/Page/ShoppingCart';

function App() {
  const dispatch = useDispatch();
  const {data, isLoading} = useGetShoppingCartQuery("966dbf55-eb00-4625-a23e-3c8926df68ab");
  
  useEffect(()=>{
    if(!isLoading){
      console.log(data.result)
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  },[data]);


  
  return (
  <div className="text-success">
    <Header />
    <div className='pb-5'>
      <Routes>
        <Route path="/" element={<Home />}></Route> 
        <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />}></Route>   
        <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
        <Route path="*" element={<NotFound />}></Route> 
      </Routes>
    </div>
    <Footer />
    </div>)

}

export default App;
