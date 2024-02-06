import React from "react";
import { Link } from "react-router-dom";
import { AddShoppingCart } from "@mui/icons-material";
import { toast } from "react-toastify";
import cookie from "react-cookies";
export const SonataButton = (props) => {
  let template = "";
  switch (props.type) {
    case "default":
      template = (
        <Link
          className={!props.altClass ? "link_default" : props.altClass}
          to={props.linkTo}
          style={{
            ...props.style,
          }}
        >
          {props.title}
        </Link>
      );
      break;
    case "bag_link":
      template = (
        <div
          className="bag_link"
          onClick={() => {
            props.runAction();
          }}
          style={{ ...props.style }}
        >
          <AddShoppingCart style={{ fontSize: props.iconSize }} />
        </div>
      );
      break;
    case "add_to_cart_link":
      template = (
        <div
          className="add_to_cart_link"
          onClick={() => {
            props.runAction();
          }}
          style={{ ...props.style }}
        >
        <AddShoppingCart style={{ fontSize: props.iconSize }} />
            Add to Cart
        </div>
      );
      break;
    default:
      template = "";
  }
  return template;
};

export const renderCardImage = (image) => {
  if (image.length > 0) {
    return image[0];
  } else {
    return "/images/image_not_availble.png";
  }
};

export const showToast = (type, msg) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "success!",
      });
      break;
    case "ERROR":
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "error!",
      });
      break;
    default:
      return false;
  }
};

export const errorHelper = (formik, value) => ({
  error: formik.errors[value] && formik.touched[value] ? true : false,
  helperText:
    formik.errors[value] && formik.touched[value] ? formik.errors[value] : null,
});

export const getTokenCookie = () => {
  return cookie.load("x-access-token");
};
export const removeTokenCookie = () => {
  return cookie.remove("x-access-token", { path: "/" });
};
export const getAuthHeader = () => {
  return {
    headers: { Authorization: `Bearer ${getTokenCookie()}` },
  };
};
