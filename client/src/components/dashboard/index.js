import React from "react";
import DashboardLayout from "hoc/dashboardLayout";
const UserDashboard = (props) => {
    console.log(props.users.data);
  return (
    <DashboardLayout title="Overview">
      <div className="user_nfo_panel">
        <div>
          <span>{props.users.data.firstname}</span>
          <span>{props.users.data.lastname}</span>
          <span>{props.users.data.email}</span>
        </div>
        {props.users.data.history ? (
          <div className="user_nfo_panel">
            <h1>Purchase History</h1>
            <div className="user_product_block_wrapper">history</div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
