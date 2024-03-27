import React from 'react'
import { useState, useEffect } from 'react';
import { menuItemModel } from '../../../Interfaces';

function MenuItemList() {
    const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  useEffect(()=>{
    fetch("https://redmangoapi.somee.com/api/MenuItem")
    .then((response)=>response.json())
    .then((data)=>{ 
      console.log(data)
      setMenuItems(data.result)
    });
  },[])
  return (
    <div>
      
    </div>
  )
}

export default MenuItemList
