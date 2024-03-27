import React from 'react'
import { menuItemModel } from '../../../Interfaces'

interface MenuItemProp {
    menuItem: menuItemModel
}

function MenuItemCard({menuItem}: MenuItemProp) {
  return (
    <div>
      {menuItem.name}
    </div>
  )
}

export default MenuItemCard
