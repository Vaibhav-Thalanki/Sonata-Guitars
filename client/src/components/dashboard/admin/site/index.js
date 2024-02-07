import React from "react";
import SiteVars from './siteVars'
import DashboardLayout from "hoc/dashboardLayout";

const ManageSite = () =>{
    return <>
        <DashboardLayout title="Manage Site">
        <SiteVars />
        </DashboardLayout>
    </>
}

export default ManageSite