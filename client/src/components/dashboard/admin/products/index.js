import React, { useEffect, useReducer, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  productsByPaginate,
  productRemove,
} from "store/actions/product.actions";
import ProductsTable from "./productsTable";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const defaultValues = {
  keywords: "",
  brand: [],
  min: 0,
  max: 5000,
  frets: [],
  page: 1,
};

const AdminProduct = (props) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const [clickedSearch,setClickedSearch] =useState(false)

  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const [searchValues, setSearchValues] = useReducer((state, newState) => {
    return { ...state, ...newState };
  }, defaultValues);

  const formik = useFormik({
    initialValues: {
        keywords: ''
    },
    validationSchema: Yup.object({
        keywords: Yup.string().min(3,'You need more than 3').max(200,'Search is too long')
    }),
    onSubmit:(values,{resetForm})=>{
        setSearchValues({
            keywords: values.keywords, page: 1
        });
        setClickedSearch(true)
      
    }
  })
  
  const resetSearch = () =>{
    formik.resetForm()
    setClickedSearch(false)
    setSearchValues(defaultValues)
  }


  useEffect(() => {
    
    dispatch(productsByPaginate(searchValues));
  }, [dispatch, searchValues]);

  useEffect(() => {
    
    handleClose()
    if (notifications && notifications.removeProduct) {
      dispatch(productsByPaginate(searchValues));
    }
  }, [dispatch, notifications, searchValues]);

  const gotoPage = (page) => {
    setSearchValues({ page: page });
  };

  const goToEdit = (id) => {
    navigate(`/dashboard/admin/edit_product/${id}`);
  };
  const handleClose = () => {
    setRemoveModal(false);
  };
  const handleModal = (id) => {
    setToRemove(id);
    setRemoveModal(true);
  };
  const handleRemove = () => {
    dispatch(productRemove(toRemove));
  };
  return (
    <DashboardLayout title="Products">
      <div className="products_table">
        <div>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <TextField
                    style={{width:'100%'}}
                    name="keywords"
                    label="Enter your search"
                    variant="outlined"
                    {...formik.getFieldProps('keywords')}
                    {...errorHelper(formik,'keywords')}
                />
            </form>
            {clickedSearch?
                <Button
            onClick={()=>resetSearch()}>
                Reset Search
            </Button>
            :null}
           
        </div>
        <hr />
        <ProductsTable
          removeModal={removeModal}
          prods={products.byPaginate}
          prev={(page) => {
            return gotoPage(page);
          }}
          next={(page) => {
            return gotoPage(page);
          }}
          goToEdit={(id) => {
            return goToEdit(id);
          }}
          handleClose={() => {
            handleClose();
          }}
          handleModal={(id) => handleModal(id)}
          handleRemove={() => handleRemove()}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminProduct;
