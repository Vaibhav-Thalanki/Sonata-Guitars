import React, { useEffect, useState } from "react";
import { SonataButton } from "utils/tools";
import { DoneOutline, LocalShipping } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import HandleAddToCart from "utils/AddToCartHandler";
import { userAddCart } from "store/actions/user.actions";

const ProdInfo = (props) => {
  const [modal, setModal] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClose = () => {
    setModal(false);
  };
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

  const showProdSpecs = (detail) => {
    return (
      <div className="product_specifications">
        <h2>Specs:</h2>
        <div className="item">
          <strong>Frets:</strong> {detail.frets}
        </div>
        <div className="item">
          <strong>Wood:</strong> {detail.woodtype}
        </div>
      </div>
    );
  };
  const showProdTags = (detail) => {
    return (
      <div className="product_tags">
        <div className="tag">
          <div>
            <LocalShipping />
          </div>
          <div className="tag_text">
            {detail.shipping ? (
              <div>Free Shipping for the EU region</div>
            ) : (
              <div>No free shipping for this item</div>
            )}
          </div>
        </div>
        {detail.available > 0 ? (
          <div className="tag">
            <div>
              <DoneOutline />
            </div>
            <div className="tag_text">
              <div>
                <strong>{detail.available}</strong> products available in
                warehouse
              </div>
            </div>
          </div>
        ) : (
          <div className="tag">
            <div>
              <SentimentVeryDissatisfied />
            </div>
            <div className="tag_text">
              <div>Sorry Product Not Available</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const showProdActions = (detail) => {
    return (
      <div className="product_actions">
        <div className="price">$ {detail.price}</div>
        <div className="cart">
          <SonataButton
            type="add_to_cart_link"
            runAction={() => handleAddToCart(detail)}
          />
        </div>
      </div>
    );
  };

  const detail = props.detail;
  return (
    <div>
      <h1>
        {detail.brand.name} {detail.model}
      </h1>
      <p>{detail.description}</p>
      {showProdTags(detail)}
      {showProdActions(detail)}
      {showProdSpecs(detail)}

      <HandleAddToCart
        modal={modal}
        errorType={errorType}
        handleClose={handleClose}
      />

    </div>
  );
};

export default ProdInfo;
