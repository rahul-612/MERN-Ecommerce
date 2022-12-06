import React, { useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../Loader/Loader.js";
import ProductCard from "../home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import {
  // PushToTalkButton,
  // PushToTalkButtonContainer,
  // ErrorPanel,
  PushToTalkButton,
  BigTranscript,
  IntroPopup,
} from "@speechly/react-ui";
import { useSpeechContext } from "@speechly/react-client";
import { useHistory } from "react-router-dom";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const { segment } = useSpeechContext();
  const history = useHistory();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert]);

  useEffect(() => {
    if (segment) {
      if (segment.isFinal && segment.intent.intent === "show") {
        segment.entities.forEach((e) => {
          switch (e.type) {
            case "category":
              if (
                e.value.toLowerCase() === "laptops" ||
                e.value.toLowerCase() === "laptop"
              ) {
                setCategory("Laptop");
              } else if (
                e.value.toLowerCase() === "footwears" ||
                e.value.toLowerCase() === "footwear"
              ) {
                setCategory("Footwear");
              } else if (
                e.value.toLowerCase() === "bottoms" ||
                e.value.toLowerCase() === "bottom"
              ) {
                setCategory("Bottoms");
              } else if (
                e.value.toLowerCase() === "tops" ||
                e.value.toLowerCase() === "top"
              ) {
                setCategory("Tops");
              } else if (
                e.value.toLowerCase() === "attires" ||
                e.value.toLowerCase() === "attire"
              ) {
                setCategory("Attire");
              } else if (
                e.value.toLowerCase() === "cameras" ||
                e.value.toLowerCase() === "camera"
              ) {
                setCategory("Camera");
              } else if (
                e.value.toLowerCase() === "smartphones" ||
                e.value.toLowerCase() === "smartphone" ||
                e.value.toLowerCase() === "phones" ||
                e.value.toLowerCase() === "phone" ||
                e.value.toLowerCase() === "mobiles" ||
                e.value.toLowerCase() === "mobile"
              ) {
                setCategory("SmartPhones");
              }

              break;
            case "brand":
              history.push(`/products/${e.value.toLowerCase()}`);
              break;
          }
        });
      }
    }
  }, [segment]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS" />
          {/* manual code of user voice text! which is not require now because speechly introduced BigTranscript component */}
          {/* <h3 className="speechlyText">
            {segment && segment.words.map((w) => w.value).join(" ")}
          </h3> */}
          <h2 className="productsHeading"> Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          {/* <PushToTalkButtonContainer>
            <PushToTalkButton />
            <ErrorPanel />
          </PushToTalkButtonContainer> */}
          <BigTranscript placement="top" fontSize="2rem"/>
          <PushToTalkButton placement="bottom" captureKey=" " />
          <IntroPopup/>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              className="priceSlider"
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
