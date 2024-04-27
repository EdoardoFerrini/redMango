import React from 'react'
import { CartPickupDetails, CartSummary } from '../Components/Page/Cart'
import withAuth from '../HOC/withAuth'

function ShoppingCart() {
  return (
    <div>
      <div className='row w-100' style={{ margin: "10px" }}>
        <CartSummary />
      </div>
      <div className='col-lg-6 col-12 p-4'>
        <CartPickupDetails />
      </div>
    </div>
  )
}

export default withAuth(ShoppingCart)
