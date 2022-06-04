import React from 'react'
import './header.css';
import IconButton from '@mui/material/IconButton';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import Search from "./Search";
import { NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';


const Header = () => {
  return (
    <>
      <section id="header">
      {window.innerWidth>=769?(
        <>
        <div className="leftHead flex">
          
            <NavLink to="/" className="SiteLogo"><h1><span>E</span>asy<span>-Bazaar</span></h1></NavLink>
          
          <ul>
            <li>
              <NavLink exact activeClassName='active_class' className="headLink" to="/">Home</NavLink>
              <NavLink exact activeClassName='active_class' className="headLink" to="/products">Products</NavLink>
              <NavLink exact activeClassName='active_class' className="headLink" to="/contact">Contact</NavLink>
              <NavLink exact activeClassName='active_class' className="headLink" to="/about">About</NavLink>
            </li>
          </ul>
        </div>
        <div className="rightHead flex">
         <Search/>
          <div className="rightUser flex">
          <NavLink to="/cart"><LocalMallIcon  className="rightIcon " fontSize="large"/></NavLink>
          <NavLink to="/login"> <PersonIcon className="rightIcon" fontSize="large"/></NavLink>
          </div>
          
        </div>
        </>  
     ):(<>
      <Menu noOverlay>
        <NavLink exact activeClassName='active_class' className="headLink menu-item" to="/">Home</NavLink>
        <NavLink exact activeClassName='active_class' className="headLink menu-item" to="/products">Products</NavLink>
        <NavLink exact activeClassName='active_class' className="headLink menu-item" to="/about">About</NavLink>
        <NavLink exact activeClassName='active_class' className="headLink menu-item" to="/contact">Contact</NavLink>
        
      </Menu>
      <Search/>
      <div className="rightUser flex">
          <NavLink to="/cart"><LocalMallIcon  className="rightIcon " fontSize="large"/></NavLink>
          <NavLink to="/login"> <PersonIcon className="rightIcon" fontSize="large"/></NavLink>
          </div>
          </>
          )}
        </section>
    </>
  )
}

export default Header