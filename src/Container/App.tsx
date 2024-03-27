import React from 'react';
import Header from '../Components/Layout/Header';
import Footer from '../Components/Layout/Footer';
import { Home, MenuItemDetails, NotFound } from '../Pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  
  return (
  <div className="text-success">
    <Header />
    <div className='pb-5'>
      <Routes>
        <Route path="/" element={<Home />}></Route> 
        <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />}></Route>   
        <Route path="*" element={<NotFound />}></Route> 
      </Routes>
    </div>
    <Footer />
    </div>)

}

export default App;
