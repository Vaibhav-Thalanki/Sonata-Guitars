import React, { useState } from "react";
import { renderCardImage, SonataButton } from "../tools";
import { useDispatch, useSelector } from "react-redux";
import HandleAddToCart from "utils/AddToCartHandler";
import { userAddCart } from "store/actions/user.actions";

const Card = (props) => {
  const [modal, setModal] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    if (!user.auth) {
      setModal(true);
      setErrorType("auth");
      return false;
    }
    if (!user.data.verified) {
      setModal(true);
      setErrorType("verify");
      return false;
    }
    dispatch(userAddCart(item));
  };
  const handleClose = () => {
    setModal(false);
  };
  return (
    <div className={`card_item_wrapper ${props.grid ? "grid_bars" : ""}`}>
      <div
        className="image"
        style={{
          background: `url(${renderCardImage(props.item.images)})`,
        }}
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{props.item.brand.name}</div>
          <div className="name">{props.item.model}</div>
          <div className="name">${props.item.price}</div>
        </div>

        {props.grid ? (
          <div className="description">
            <p>{props.item.description}</p>
          </div>
        ) : null}

        <div className="actions">
          <div className="button_wrapp">
            <SonataButton
              type="default"
              altClass="card_link"
              title="View Product"
              linkTo={`/product_detail/${props.item._id}`}
              style={{
                fontWeight: "bold",
              }}
            />
          </div>
          <div className="button_wrapp">
            <SonataButton
              type="bag_link"
              runAction={() => handleAddToCart(props.item)}
              iconSize="23"
            />
          </div>
        </div>
      </div>
      <HandleAddToCart
        modal={modal}
        errorType={errorType}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Card;
