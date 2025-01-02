import * as actions from "./index";
import axios from "axios";
import { Server_API } from "constants/apiConstants";
import { getAuthHeader, removeTokenCookie, getTokenCookie } from "utils/tools";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

export const userRegister = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(Server_API+"api/auth/register", {
        email: values.email,
        password: values.password,
      });
      console.log(user);
      dispatch(
        actions.userAuthenticate({
          data: user.data.user,
          auth: true,
        })
      );
      dispatch(
        actions.successGlobal("WELCOME ! Check Your mail to verify account")
      );
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userLogin = (values) => {
  return async (dispatch) => {
    try {
      const user = await axios.post(Server_API+"api/auth/signin", {
        email: values.email,
        password: values.password,
      });
      dispatch(
        actions.userAuthenticate({
          data: user.data.user,
          auth: true,
        })
      );

      dispatch(actions.successGlobal("WELCOME BACK!"));
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userIsAuth = () => {
  return async (dispatch) => {
    try {
      const site = await axios.get(Server_API+"api/site");
      dispatch(actions.getSiteVars(site.data));

      if (!getTokenCookie()) {
        throw new Error();
      }
      const user = await axios.get(Server_API+"api/auth/isauth", getAuthHeader());

      dispatch(
        actions.userAuthenticate({
          data: user.data,
          auth: true,
        })
      );
    } catch (err) {
      dispatch(actions.userAuthenticate({ data: {}, auth: false }));
    }
  };
};

export const userSignOut = () => {
  return async (dispatch) => {
    try {
      removeTokenCookie();
      dispatch(actions.userSignOut());
      dispatch(actions.successGlobal("Good Bye!"));
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};

export const userUpdateProfile = (data) => {
  return async (dispatch, getState) => {
    try {
      let profile = await axios.patch(
        Server_API+"api/users/profile",
        { ...data },
        getAuthHeader()
      );

      const userData = {
        ...(await getState().users.data),
        firstname: profile.data.firstname,
        lastname: profile.data.lastname,
      };
      dispatch(actions.userUpdateProfile(userData));
      dispatch(actions.successGlobal("Profile updated !!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userChangeEmail = (data) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        Server_API+"api/users/email",
        {
          email: data.email,
          newemail: data.newemail,
        },
        getAuthHeader()
      );

      dispatch(actions.userChangeEmail(data.newemail));
      dispatch(
        actions.successGlobal(
          "Email updated, remember to verify your account !!"
        )
      );
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userAddCart = (item) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().users.cart;
      cart.push(item);
      dispatch(actions.userAddCart(cart));
      dispatch(actions.successGlobal(`${item.model} added to cart!`));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userRemoveFromCart = (position) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().users.cart;
      cart.splice(position, 1);

      dispatch(actions.userAddCart(cart)); // can use same dispatch
      dispatch(actions.successGlobal(`Removed From Cart!`));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const userPurchaseSuccess = (orderId) => {
  return async (dispatch, getState) => {
    try {
      const user = await axios.post(
        Server_API+"api/transaction/",
        { orderId },
        getAuthHeader()
      );
      dispatch(actions.successGlobal(`Payment Success`));
      dispatch(actions.userPurchaseSuccess(user.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
