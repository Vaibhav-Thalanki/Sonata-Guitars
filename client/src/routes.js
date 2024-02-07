import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "components/navigation/header";
import Loader from "utils/loader";
import Footer from "components/navigation/footer";
import Home from "components/home";
import Shop from "components/shop";
import MainLayout from "hoc/mainLayout";
import RegisterLogin from "components/auth";
import UserDashboard from "components/dashboard";
import AuthGaurd from "hoc/authGaurd"
import UserInfo from "components/dashboard/user/info";
import AdminProduct from "components/dashboard/admin/products";
import AddProduct from "components/dashboard/admin/products/addedit/add";
import EditProduct from "components/dashboard/admin/products/addedit/editProduct";
import ProductDetail from "components/product";
import UserCart from "components/dashboard/user/cart";
import ManageSite from "components/dashboard/admin/site";

import { useDispatch, useSelector } from "react-redux";
import { userIsAuth,userSignOut } from "store/actions/user.actions";



const MainRoute = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);
  useEffect(()=>{
    if(users.auth!==null){
      setLoading(false)
    }
  },[users])
  const signOutUser = ()=>{
    dispatch(userSignOut())
  }
  return (
    <BrowserRouter>
      {loading ? (
        <Loader full={true} />
      ) : (
        <>
          <Header 
            users={users}
            signOutUser = {signOutUser}
          />
          <MainLayout>
            <Routes>
            <Route path="dashboard/admin/edit_product/:id" element={<AuthGaurd><EditProduct /></AuthGaurd>} />

            <Route path="shop" element={<Shop />} />

            <Route path="dashboard/admin/add_products" element={<AuthGaurd><AddProduct /></AuthGaurd>} />

            <Route path="dashboard/admin/admin_products" element={<AuthGaurd><AdminProduct /></AuthGaurd>} />
            <Route path="dashboard" element={<AuthGaurd><UserDashboard /></AuthGaurd>} />
            <Route path="dashboard/user/user_info" element={<AuthGaurd><UserInfo /></AuthGaurd>} />
            <Route path="product_detail/:id" element={<ProductDetail />} />

              <Route path="sign_in" element={<RegisterLogin />} />
              
              <Route path="/dashboard/user/user_cart" element={<AuthGaurd><UserCart /></AuthGaurd>} />

              <Route path="/dashboard/admin/manage_site" element={<AuthGaurd><ManageSite /></AuthGaurd>} />

              <Route path="/" element={<Home />} />
            </Routes>
          </MainLayout>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default MainRoute;
