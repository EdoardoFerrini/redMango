import React from "react";
import { CartSummary } from "./Cart";
import CartPickupDetails from "./Cart/CartPickupDetails";

function ShoppingCart() {
  return (
    <div className="row r-100" style={{ marginTop: "10px" }}>
      <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
        <CartSummary />
      </div>
      <div className="col-lg-6 col-12 p-4">
        <CartPickupDetails />
      </div>
    </div>
  );
}

export default ShoppingCart;
