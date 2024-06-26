import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../Api/menuItemApi";
import { useUpdateShoppingCartMutation } from "../Api/shoppingCartApi";
import { MainLoader } from "../Components/Page/Common";
import { apiResponse } from "../Interfaces";
import toastNotify from "../Helper/toastNotify";
function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (quantity > 0 || newQuantity > 0) {
      setQuantity(newQuantity);
    }
    return;
  };

  const handleAddtoCart = async (menuItemId: number) => {
    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: "966dbf55-eb00-4625-a23e-3c8926df68ab",
    });

    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to the cart successfully");
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data.result?.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.specialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px", color: "black" }} className="pt-2">
              {data.result?.description}
            </p>
            <span className="h3" style={{ color: "black" }}>
              {data.result.price}€
            </span>{" "}
            &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{
                border: "1px solid #333",
                borderRadius: "30px",
                color: "black",
              }}
            >
              <i
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
                onClick={() => handleQuantity(-1)}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                className="bi bi-plus p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
                onClick={() => handleQuantity(+1)}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MainLoader />
                  </button>
                ) : (
                  <button
                    className="btn btn-success form-control"
                    onClick={() => handleAddtoCart(data.result?.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.result.image}
              width="100%"
              style={{ borderRadius: "50%" }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  );
}

export default MenuItemDetails;
