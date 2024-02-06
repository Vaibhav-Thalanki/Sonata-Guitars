import React, { useState, useEffect } from "react";
import { renderCardImage } from "utils/tools";

const CartDetail = ({ products, removeItem }) => {

   
  const renderItems = (products) => {
    return products
      ? products.map((item, i) => {
          return (
            <div className="user_product_block" key={item._id}>
              <div className="item">
                <div
                  className="image"
                  style={{
                    background: `url(${renderCardImage(
                      item.images
                    )}) no-repeat`,
                  }}
                ></div>
              </div>
              <div className="item">
                <h4>Product Name</h4>
                <div>{item.brand.name} {item.model}</div>
              </div>
              <div className="item">
                <h4>Price</h4>
                <div>${item.price}</div>
              </div>
              <div className="item btn">
                <div className="cart_remove_btn"
                onClick={(position)=>removeItem(position)}>
                Remove
                </div>
              </div>
            </div>
          );
        })
      : null;
  };
  return <div>{renderItems(products)}</div>;
};

export default CartDetail;
