import React, { useEffect } from "react";
import Featured from "./featured";
import SlimPromotion from "utils/promotions/slimblock";
import CardBlock from "utils/products/cardblocks";
import { useDispatch, useSelector } from "react-redux";
import Loader from "utils/loader";
import { productsBySort } from "store/actions/product.actions";

const slimPromotion = {
  img: "/images/featured/featured_home_3.jpg",
  lineOne: "Up to 40% Off",
  lineTwo: "In second hand guitars",
  linkTitle: "Shop Now",
  linkTo: "/shop",
};
const Home = () => {
  const { bySold, byDate } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      productsBySort({
        limit: 4,
        sortBy: "itemSold",
        order: "desc",
      })
    );
    dispatch(
      productsBySort({
        limit: 4,
        sortBy: "date",
        order: "desc",
      })
    );
  }, [dispatch]);

  return (
    <div>
      <Featured />
      {bySold ? (
        <CardBlock items={bySold} title="Best Selling Guitars" />
      ) : (
        <Loader />
      )}
      <SlimPromotion items={slimPromotion} />
      {byDate ? (
        <CardBlock items={byDate} title="Latest Guitars" />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
