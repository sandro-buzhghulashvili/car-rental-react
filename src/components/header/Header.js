import React from 'react';

import Navbar from './Navbar';
import Introduction from './Intorduction';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header} id="home">
      <Navbar />
      <Introduction />
    </header>
  );
};

export default Header;
