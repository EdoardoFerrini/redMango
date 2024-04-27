import React from "react";
import { UserModel, apiResponse, menuItemModel } from "../../../Interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../../../Api/shoppingCartApi";
import { MiniLoader } from "../Common";
import toastNotify from "../../../Helper/toastNotify";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";

interface MenuItemProp {
  menuItem: menuItemModel;
}

function MenuItemCard({ menuItem }: MenuItemProp) {
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  
  const userData: UserModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleAddtoCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to the cart successfully");
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${menuItem.id}`}>
              <img
                src={menuItem.image}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>
          {menuItem.specialTag && menuItem.specialTag.length > 0 && (
            <i
              className="bi bi-star btn btn-success"
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
            >
              &nbsp; {menuItem.specialTag}
            </i>
          )}

          {isAddingToCart ? (
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              <MiniLoader />
            </div>
          ) : (
            <i
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
              onClick={() => handleAddtoCart(menuItem.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link
                to={`/menuItemDetails/${menuItem.id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                {menuItem.name}
              </Link>
            </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {menuItem.description}
          </p>
          <div className="row text-center">
            <h4>{menuItem.price} €</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
