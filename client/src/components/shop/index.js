import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';
import CollapseCheckbox from './collapseCheckBox';
import SearchBar from './searchBar';
import React,{ useEffect, useReducer, useState } from 'react';
import PaginationComponent from 'utils/paginateNav';
import { useDispatch, useSelector } from 'react-redux'
import { productsByPaginate } from 'store/actions/product.actions';
import { getAllBrands } from 'store/actions/brands.actions';
import CardBlock from 'utils/products/cardblocks';
import RangeSelect from './rangeSelect';

const defaultValues = { keywords:'',brand:[], min:0,max:5000,frets:[], page:1 }

const Shop = () => {
  
    const [grid, setGrid] = useState(false);
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => {
          console.log(newState,'newstate');
          switch(newState.type){
            case "reset":
              return defaultValues
              break;
            default:

             return ({...state,...newState })
          }
          },
        defaultValues
    );
    const { byPaginate } = useSelector(state=> state.products)
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();
    
    const handleGrid = () => setGrid(!grid);


    useEffect(()=>{
        dispatch(getAllBrands())
    },[dispatch]);


    useEffect(()=>{
        dispatch(productsByPaginate(searchValues))
    },[searchValues,dispatch])

    const goToPage = (page)=>{
      setSearchValues({page:page})
    }

    const handleResetSearch = ()=>{
     
      setSearchValues({type:"reset"})
    }
    const handleKeywords = (values)=>{
  
      setSearchValues({...values,page: 1})
    }
    const handleFilters =(filters,category)=>{
      if(category==='brands'){
        setSearchValues({brand:filters,page:1})
      }
      if(category==='frets'){
        setSearchValues({frets:filters,page:1})
      }
    }
    const handleRange = (min,max)=>{
      if(!min) min=0
      if(!max) max=5000
      setSearchValues({min,max,page:1})
    }
    
    return(
        <div className="page_container">
            <div className="page_top">
                <div className="container">
               <SearchBar
                      defaultKeyword = {searchValues.keywords}
                      handleKeywords={(values)=>handleKeywords(values)}
                      resetFormAfter={()=>handleResetSearch()}
                    />
                    
                </div>
            </div>
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckbox
                        update={searchValues.brand}
                          initialState={true}
                          title='Brands'
                          list={brands.all}
                          handleFilters={(filters)=>handleFilters(filters,'brands')}
                        />
                        <CollapseCheckbox
                        update={searchValues.frets}
                          initialState={false}
                          title='Frets'
                          list={[
                            {_id: 20,name: 20},
                            {_id: 21,name: 21},
                            {_id: 22,name: 22},
                            {_id: 24,name: 24},
                          ]}
                          handleFilters={(filters)=>handleFilters(filters,'frets')}
                        />
                        <RangeSelect
                          title="Price"
                          handleRange={(min,max)=>handleRange(min,max)}
                        />
                    </div>
                    <div className="right">
                        <div className="shop_options">
                            <div className="shop_grids clear">
                                <div className={`grid_btn ${grid ? '': 'active'}`}
                                    onClick={()=> handleGrid()}
                                >
                                    <GridOnIcon/>
                                </div>
                                <div className={`grid_btn ${!grid ? '': 'active'}`}
                                    onClick={()=> handleGrid()}
                                >
                                    <GridOffIcon/>
                                </div>
                            </div>
                            <div>
                                { byPaginate && byPaginate.docs ?
                                    <>
                                       <CardBlock
                                        grid={grid}
                                        items={byPaginate.docs}
                                        shop={true}
                                       />
                                       <PaginationComponent
                                        prods={byPaginate}
                                        prev={(page)=>goToPage(page)}
                                        next={(page)=>goToPage(page)}
                                        resetSearch={()=>handleResetSearch()}
                                       />
                                    </>
                                    :null
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Shop;