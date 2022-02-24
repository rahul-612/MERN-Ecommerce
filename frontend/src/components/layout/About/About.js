import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import myPic from "./my.jpg";


const About = () => {
  const visitPortfolio = () => {
    window.location = "https://rahul612-portfolio.herokuapp.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={myPic}
              alt="Founder"
            />
            <Typography>Rahul Kumar</Typography>
            <Button  color="primary">
            <a style={{textDecoration:"none"}} href="https://rahul612-portfolio.herokuapp.com/" target="_blank">
              Visit Portfolio</a>
            </Button>
            <span>
              This is a sample wesbite based on MERN stack made by Rahul Kumar.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Links</Typography>
            <a
              href="https://github.com/rahul-612"
              target="blank"
            >
              <GitHubIcon className="gitHubSvgIcon" />
            </a>

            <a href="https://instagram.com/blessed_612" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://www.linkedin.com/in/rahul-kumar-83658a222">
              <LinkedInIcon className="linkedInSvgIcon"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
