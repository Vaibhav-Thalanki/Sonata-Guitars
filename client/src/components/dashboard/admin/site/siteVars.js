import React, { useEffect, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { updateSiteVars } from "store/actions/site.actions";

const SiteVars = () => {
  const dispatch = useDispatch();
  const site = useSelector((state) => state.site);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: site.vars.address,
      phone: site.vars.phone,
      hours: site.vars.hours,
      email: site.vars.email,
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("This is required"),
      phone: Yup.string()
        .max(15, "Minimum 3 characters")
        .required("This is required"),
      hours: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("This is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("This is required"),
    }),
    onSubmit: (values) => {
      dispatch(updateSiteVars({
        _id: site.vars._id,
        ...values
      }))
    },
  });
  return (
    <>
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{
              width: "100%",
            }}
            name="address"
            label="Enter Store Address"
            variant="outlined"
            {...formik.getFieldProps("address")}
            {...errorHelper(formik,'address')}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{
              width: "100%",
            }}
            name="phone"
            label="Enter Store Phone"
            variant="outlined"
            {...formik.getFieldProps("phone")}
            {...errorHelper(formik,'phone')}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{
              width: "100%",
            }}
            name="hours"
            label="Enter Store Working Hours"
            variant="outlined"
            {...formik.getFieldProps("hours")}
            {...errorHelper(formik,'hours')}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{
              width: "100%",
            }}
            name="email"
            label="Enter Store Email"
            variant="outlined"
            {...formik.getFieldProps("email")}
            {...errorHelper(formik,'email')}
          />
        </div>
        <Button
        variant="contained"
        color="primary"
        type="submit"
        >
            Edit Store Information
        </Button>
      </form>
    </>
  );
};

export default SiteVars;
