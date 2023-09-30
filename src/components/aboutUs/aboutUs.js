import React from 'react';

import classes from './aboutUs.module.css';
import img from '../../assets/user.jpg';

const AboutUs = () => {
  return (
    <div className={classes['about-us']} id="aboutUs">
      <div className={classes.header}>
        <h1>
          WHAT <span className={classes.orange}>OUR CLIENTS SAY</span>
        </h1>
      </div>
      <div className={classes.response}>
        <img src={img} alt="user" />
        <div className={classes.feedback}>
          <h2>"An amazing service"</h2>
          <p>
            Booking was a breeze! Loved the simple and intuitive interface of
            the website. The car selection was fantastic, and the whole process
            was quick. Will definitely use this service again for my future
            trips
          </p>
          <h3 className={classes.orange}>John Doe</h3>
          <h3>Web developer</h3>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
