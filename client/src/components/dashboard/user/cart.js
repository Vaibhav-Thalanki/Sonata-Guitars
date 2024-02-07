import React, { useState, useEffect } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import CartDetail from "./cartDetail";
import { userRemoveFromCart } from "store/actions/user.actions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { userPurchaseSuccess } from "store/actions/user.actions";
import { useNavigate } from "react-router-dom";

import Loader from "utils/loader";

const UserCart = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(userRemoveFromCart(id));
  };

  const calculateTotal = () => {
    let total = 0;
    props.users.cart.forEach((element) => {
      total += parseFloat(element.price, 10);
    });
    return total;
  };

  const generateUnits = () => [
    {
      description: "Guitars and accessories",
      amount: {
        currency_code: "USD",
        value: calculateTotal(),
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: calculateTotal(),
          },
        },
      },
      items: generateItems(),
    },
  ];

  const generateItems = () => {
    let items = props.users.cart.map((item) => ({
      unit_amount: {
        currency_code: "USD",
        value: item.price,
      },
      quantity: 1,
      name: item.model,
    }));
    return items;
  };
  useEffect(() => {
    if (notifications && notifications.success) {
      navigate("/dashboard");
    }
    if (notifications && notifications.error) {
      setLoading(false);
    }
  }, [notifications, navigate]);

  return (
    <>
      <DashboardLayout title="Your Cart">
        {props.users.cart && props.users.cart.length > 0 ? (
          <>
            <CartDetail
              products={props.users.cart}
              removeItem={(id) => handleRemoveItem(id)}
            />
            <div className="user_cart_sum">
              <div>Total Amount: ${calculateTotal()}</div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className="pp_button">
                <PayPalScriptProvider
                  options={{
                    clientId:
                      "Af6eX_yaGFYOr1M8PpmUvKPo-Xk3IKB_njvSxsTtG6CLJIQR1wA40LZTb9RpxmccdJpJl8OPSetWuGjh",
                    currency: "USD",
                    disableFunding: "credit,card",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: generateUnits(),
                      });
                    }}
                    onApprove={(details) => {
                      console.log(details);
                      setLoading(true);
                      dispatch(userPurchaseSuccess(details.orderID));
                    }}
                    onCancel={(data) => {
                      setLoading(false);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </>
        ) : (
          <div>No Items in Cart</div>
        )}
      </DashboardLayout>
    </>
  );
};

export default UserCart;
