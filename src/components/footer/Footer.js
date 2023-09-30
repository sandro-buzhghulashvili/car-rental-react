import React from 'react';

import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <h2>Drive Mate</h2>
      <div className={classes.services}>
        <ul>
          <li className={classes.header}>Create Free Account</li>
          <li>Sign in</li>
          <li>Feedback</li>
          <li>Pricing</li>
        </ul>
        <ul>
          <li className={classes.header}>Resources</li>
          <li>Community</li>
          <li>Become a partner</li>
          <li>Our technology</li>
        </ul>
        <ul>
          <li className={classes.header}>Support</li>
          <li>Contact Us</li>
          <li>Terms of use</li>
          <li>Privacy and policy</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
