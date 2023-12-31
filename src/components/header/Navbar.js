import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

import userContext from '../../store/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import classes from './Navbar.module.css';
import Modal from '../ui/Modal';
import SignUpForm from '../forms/SignUpForm';
import LoginForm from '../forms/LoginForm';
import Profile from '../profile/Profile';

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const [giveNavColor, setGiveNavColor] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showProfileDashboard, setShowProfileDashboard] = useState(false);

  const ctx = useContext(userContext);

  const toggleNavHandler = () => {
    setToggleNav((prevValue) => !prevValue);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    toggleNavHandler();

    const section = document.getElementById(sectionId);

    section.scrollIntoView({ behavior: 'smooth' });
  };

  const openOrCloseDashboard = () => {
    setShowProfileDashboard((prevValue) => !prevValue);
  };

  const openOrCloseSignUpForm = () => {
    setShowSignUpForm((prevValue) => !prevValue);
  };

  const openOrCloseLoginForm = () => {
    setShowLoginForm((prevValue) => !prevValue);
  };

  const navScrollHandler = () => {
    if (window.scrollY > 88) {
      setGiveNavColor(true);
    } else {
      setGiveNavColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', navScrollHandler);
    return () => {
      window.removeEventListener('scroll', navScrollHandler);
    };
  });

  const burgerBar = (
    <FontAwesomeIcon
      icon={faBars}
      className={classes['burger-menu']}
      onClick={toggleNavHandler}
    />
  );
  return (
    <>
      {showSignUpForm &&
        ReactDOM.createPortal(
          <Modal
            showModal={showSignUpForm}
            onCloseModal={openOrCloseSignUpForm}
          >
            <SignUpForm />
          </Modal>,
          document.getElementById('modal')
        )}
      {showLoginForm &&
        ReactDOM.createPortal(
          <Modal showModal={showLoginForm} onCloseModal={openOrCloseLoginForm}>
            <LoginForm />
          </Modal>,
          document.getElementById('modal')
        )}
      {showProfileDashboard &&
        ReactDOM.createPortal(
          <Modal
            showModal={showProfileDashboard}
            onCloseModal={openOrCloseDashboard}
          >
            <Profile onCloseProfile={openOrCloseDashboard} />
          </Modal>,
          document.getElementById('modal')
        )}
      <nav
        className={`${classes.nav} ${giveNavColor && classes.fill}`}
        onScroll={navScrollHandler}
      >
        <h1 onClick={scrollToTop}>Drive Mate</h1>
        <section
          className={`${classes['nav-control']} ${toggleNav && classes.toggle}`}
        >
          <ul>
            <li>
              <a
                href="#1"
                onClick={() => scrollToSection('cars')}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Cars
              </a>
            </li>
            <li>
              <a
                href="#1"
                onClick={() => scrollToSection('whyChooseUs')}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Why Choose us
              </a>
            </li>
            <li>
              <a
                href="#1"
                onClick={() => scrollToSection('aboutUs')}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Feedback
              </a>
            </li>
          </ul>
          {!ctx.user ? (
            <div className={classes['btn-section']}>
              <button onClick={openOrCloseLoginForm}>Login</button>
              <button onClick={openOrCloseSignUpForm}>Sign up</button>
            </div>
          ) : (
            <FontAwesomeIcon
              onClick={openOrCloseDashboard}
              icon={faUser}
              className={classes.user}
            />
          )}
        </section>
        {burgerBar}
      </nav>
    </>
  );
};

export default Navbar;
