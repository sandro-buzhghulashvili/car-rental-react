import React, { useState } from 'react';
import Cars from './components/cars/Cars';
import userContext from './store/user-context';
import Header from './components/header/Header';
import Stats from './components/stats/Stats';
import Footer from './components/footer/Footer';
import WhyChooseUs from './components/whyChooseUs/whyChooseUs';
import AboutUs from './components/aboutUs/aboutUs';

const App = () => {
  const [user, setUser] = useState(null);

  const changeUserData = (userData) => {
    setUser(userData);
  };

  console.log(user);

  return (
    <>
      <userContext.Provider value={{ user: user, changeUser: changeUserData }}>
        <Header />
        <Cars />
      </userContext.Provider>
      <Stats />
      <WhyChooseUs />
      <AboutUs />
      <Footer />
    </>
  );
};

export default App;
