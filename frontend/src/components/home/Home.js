import React, { useEffect } from 'react'
import "./home.css";
import MouseIcon from '@mui/icons-material/Mouse';
import ProductCard from "./ProductCard.js"
import MetaData from "../layout/MetaData"
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader"
import {useAlert} from "react-alert"


const Home = () => {

    const alert=useAlert();

    const dispatch = useDispatch();

    const { loading, error, products } = useSelector((state)=>state.products)

    // useSelector ke help se store k states m jo bhi data hoga usko hum fetch kr lege

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
       }
        dispatch(getProduct())
    }, [dispatch,error])

    return (
        // isse hum loader bna skte h apne page pr yani jb tk data fetch na hi hojata kuch animation hote rhe
        <>
            {loading?(<Loader/>):(
        <>
            <MetaData title="Ecommerce" />

            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <MouseIcon className="mouseIcon" />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">

                {/* products && means agr product ha to */}

               {
                            products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}


            </div>
        </>
        )}
        </>
    )
}

export default Home;