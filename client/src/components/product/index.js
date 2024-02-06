import React,{useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "utils/loader";
import { productsById } from "store/actions/product.actions";
import { clearCurrentById } from "store/actions";
import ProdInfo from "./Prodinfo";
import { renderCardImage } from "utils/tools";
import { Modal } from "react-bootstrap";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { sliderClasses } from "@mui/material";

const ProductDetail = () =>{
    const [modal,setModal] = useState(false);
    const {id} = useParams()
    const products = useSelector(state=>state.products)
    const dispatch = useDispatch()

    const SliderSettings = {
        dot:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay: true,
        autoplaySpeed: 2000
    }

    const handleClose = ()=>{
        setModal(false)
    }
    const handleModal=()=>{
        if(products.byId.images.length>0)
        setModal(true)
    }

    useEffect(()=>{
        dispatch(productsById(id))
    },[dispatch,id])

    useEffect(()=>{
        return ()=>{
            dispatch(clearCurrentById())
        }
    },[dispatch])

    return <div className="page_container">
        <div className="page_top">
            <div className="container">
                Product Detail
            </div>
        </div>
        <div className="container">
                {products && products.byId?
                <div className="product_detail_wrapper">
                    <div className="left">
                        <div>
                            <img
                            alt=""
                            src={renderCardImage(products.byId.images)}
                            onClick={()=>handleModal()}/>
                            

                        </div>
                    </div>
                    <div className="right">
                        <ProdInfo detail={products.byId}/>
                    </div>
                </div>
                :<Loader/>}
            </div>

            <Modal show={modal} onHide={handleClose}
            dialogClassName="modal-90w">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Slider {...SliderSettings}>
                        {products.byId && products.byId.images?
                            products.byId.images.map(item=>{
                                return <div key={item} style={{margin:'0 auto'}}>
                                    <div className="img-block"
                                    style={{background:`url(${item}) no-repeat`}}>

                                    </div>
                                </div>
                            })
                        :null}
                    </Slider>
                </Modal.Body>
            </Modal>
    </div>
}

export default ProductDetail;