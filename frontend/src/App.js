import React,{useEffect,useState} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from "./components/layout/Header/Header"
import "./App.css";
import Footer from "./components/layout/Footer/Footer"
import WebFont from 'webfontloader';
import Home from "./components/home/Home"
import About from "./components/layout/About/About"
import Contact from "./components/layout/Contact/Contact"
import ProductDetails from "./components/product/ProductDetails"
import Products from "./components/product/Products"
import Search from "./components/layout/Header/Search"
import LoginSignUp from "./components/user/LoginSignUp"
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions"
import {useSelector} from "react-redux";
import Profile from "./components/user/Profile"
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from "./components/user/UpdateProfile"
import UpdatePassword from "./components/user/UpdatePassword"
import ForgotPassword from "./components/user/ForgotPassword"
import ResetPassword from "./components/user/ResetPassword"
import Cart from "./components/cart/Cart"
import Shipping from "./components/cart/Shipping.js"
import ConfirmOrder from "./components/cart/ConfirmOrder.js"
import Payment from "./components/cart/Payment.js"
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./components/cart/OrderSuccess.js"
import MyOrders from "./components/order/MyOrders.js"
import OrderDetails from "./components/order/OrderDetails.js"
import Dashboard from "./components/admin/Dashboard.js"
import ProductList from "./components/admin/ProductList.js"
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct.js";
import OrderList from "./components/admin/OrderList.js";
import ProcessOrder from "./components/admin/ProcessOrder.js";
import UserList from "./components/admin/UserList.js";
import UpdateUser from "./components/admin/UpdateUser.js";
import ProductReviews from "./components/admin/ProductReviews.js";
import AdminChat from './components/home/SupportChat/SupportWindow/AdminChat';
import Error from "./components/layout/Not Found/NotFound";
import SellerDashboard from "./components/seller/Dashboard";
import SellerProductList from "./components/seller/ProductList";
import SellerNewProduct from "./components/seller/NewProduct";
import SellerOrderList from "./components/seller/OrderList"

const App = () => {

  const {isAuthenticated,user}=useSelector(state=>state.user)
  const [stripeApiKey,setStripeApiKey]=useState("");
  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey");
    
    setStripeApiKey(data.stripeApiKey)
  }
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    store.dispatch(loadUser());
    
    getStripeApiKey()
    // console.log(user)
    // console.log(user.email)
  }, []);



  return (
    <>
    <Router>
      <Header />
      {/* yani agr login hoga to ye component chlega */}
      {isAuthenticated && <UserOptions user={user}/>}
      
      
     {stripeApiKey&&(
      <Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute exact path="/process/payment" component={Payment}/></Elements>
      )} 
      
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route  exact path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />

      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/cart" component={Cart} />
      

      <ProtectedRoute exact path="/shipping" component={Shipping}/>
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>

      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
      <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>

      <ProtectedRoute exact path="/success" component={OrderSuccess}/>
      
      <ProtectedRoute exact path="/orders" component={MyOrders}/> 

      {/* Seller Routes */}

<ProtectedRoute  exact path="/seller/dashboard" isSeller={true} component={SellerDashboard}/>
      <ProtectedRoute  exact path="/seller/products" isSeller={true} component={SellerProductList}/>
      <ProtectedRoute  exact path="/seller/product" isSeller={true} component={SellerNewProduct}/>
      <ProtectedRoute  exact path="/seller/product/:id" isSeller={true} component={UpdateProduct}/>
      <ProtectedRoute  exact path="/seller/orders" isSeller={true} component={SellerOrderList}/>
      <ProtectedRoute  exact path="/seller/order/:id" isSeller={true} component={ProcessOrder}/>
      <ProtectedRoute  exact path="/seller/support" isSeller={true} component={AdminChat}/>

           {/*Admin Routes*/}

      <ProtectedRoute  exact path="/admin/dashboard" isAdmin={true} component={Dashboard}/>
      <ProtectedRoute  exact path="/admin/products" isAdmin={true} component={ProductList}/>
      <ProtectedRoute  exact path="/admin/product" isAdmin={true} component={NewProduct}/>
      <ProtectedRoute  exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct}/>
      <ProtectedRoute  exact path="/admin/orders" isAdmin={true} component={OrderList}/>
      <ProtectedRoute  exact path="/admin/order/:id" isAdmin={true} component={ProcessOrder}/>
      <ProtectedRoute  exact path="/admin/users" isAdmin={true} component={UserList}/>
      <ProtectedRoute  exact path="/admin/user/:id" isAdmin={true} component={UpdateUser}/>
      <ProtectedRoute  exact path="/admin/reviews" isAdmin={true} component={ProductReviews}/>
      <ProtectedRoute  exact path="/admin/support" isAdmin={true} component={AdminChat}/>
      <Route component={window.location.pathname==="/process/payment"?null:Error} />
      </Switch>
      <Footer />
      </Router>
    </>
  )
}

export default App