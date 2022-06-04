import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./footer.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <footer className="footer flex">
      <div className="leftFooter flex">
        <h4>DOWNLOAD OUR APP</h4>
        <img src={playStore} alt="playstore" />
        <img className="appStoreImg" src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter flex">
        <h1>EBazaar.com</h1>
        <p>High Quality is our first priority</p>

        <p className="copyright">Copyrights 2022 &copy; Rahul</p>
      </div>

      <div className="rightFooter flex">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/blessed_612" className="insta" ><InstagramIcon className="socialIcon" fontSize="large"/></a>
        <a href="https://www.linkedin.com/in/rahul-kumar-83658a222/" className="linkedIn" ><LinkedInIcon className="socialIcon" fontSize="large"/></a>
        <a href="http://instagram.com/blessed_612" className="fb" ><FacebookIcon className="socialIcon" fontSize="large"/></a>
      </div>
    </footer>
  );
};

export default Footer;
