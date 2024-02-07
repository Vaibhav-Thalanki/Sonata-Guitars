import React from "react";
import HistoryBlock from "utils/historyBlock";
import DashboardLayout from "hoc/dashboardLayout";
import { grey } from "@mui/material/colors";
const UserDashboard = (props) => {
  return (
    <DashboardLayout title="Overview">
      <div className="user_nfo_panel">
        <div>
          <span>{props.users.data.firstname}</span>
          <span>{props.users.data.lastname}</span>
          <span>{props.users.data.email}</span>
        </div>
        {props.users.data.history.length > 0 ? (
          <div className="user_nfo_panel">
            <h1>Purchase History</h1>
            <div className="user_product_block_wrapper">
              <HistoryBlock history={props.users.data.history} />
            </div>
          </div>
        ) : (
          <>
          <div className="user_nfo_panel" style={{ textAlign: "center",
          borderTop: '1px solid grey' }}>
            No Products Bought
          </div>
          </>
        
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
