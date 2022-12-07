import React, { useEffect } from 'react';
import "./home.css";
import MouseIcon from '@mui/icons-material/Mouse';
import ProductCard from "./ProductCard.js"
import MetaData from "../layout/MetaData"
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader"
import {useAlert} from "react-alert";
import SupportEngine from "./SupportChat/SupportEngine"
import Carousel from "react-material-ui-carousel";
import banner1 from "../../images/banner/1.jpg"
import banner2 from "../../images/banner/2.jpg"
import banner3 from "../../images/banner/3.jpg"
import banner4 from "../../images/banner/4.jpg"
import banner5 from "../../images/banner/5.jpg"
import banner6 from "../../images/banner/6.jpg"


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


    let bannerImgs=[banner1,banner2,banner3,banner4,banner5,banner6]

    return (
        // isse hum loader bna skte h apne page pr yani jb tk data fetch na hi hojata kuch animation hote rhe
        <>
            {loading?(<Loader/>):(
        <>
            <MetaData title="E-Bazaar" />

            {/* <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <MouseIcon className="mouseIcon" />
                    </button>
                </a>
            </div> */}
                <Carousel duration={1000}>
                    {
                        bannerImgs.map((item,i)=>(
                            <div className="banner">
                            <img src={item} key={item} alt={`${i} Slide`} />
                            {/* <h1>FIND AMAZING PRODUCTS BELOW</h1> */}
                            {/* <h1>#Time To Shop</h1> */}
                            <div class="sign">
      <span class="fast-flicker">#now</span>or<span class="flicker">never</span>
    </div>
                            <a className="bannerBtn" href="#container">
                                <button>
                                    Scroll <MouseIcon className="mouseIcon" />
                                </button>
                            </a>
                            </div>
                        ))
                    }
                </Carousel>

            <h2 className="homeHeading">Featured test0</h2>
                
            {/* Featured Products Container */}
            <div className="container" id="container">

                {/* products && means agr product ha to */}

               {
                            products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}


            </div>
            <SupportEngine/>
        </>
        )}
        </>
    )
}

export default Home;