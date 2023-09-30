import React, { useState } from 'react';
import Cars from './components/cars/Cars';
import userContext from './store/user-context';
import WhyChooseUs from './components/whyChooseUs/whyChooseUs';
import AboutUs from './components/aboutUs/aboutUs';
import HomePage from './components/home/Home';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutPage from './components/layouts/Layout';


const router = createBrowserRouter([
  {
    path : "/",
    element : <LayoutPage />,
    children : [
      {index : true, element : <HomePage />},
      {path : "cars", element : <Cars />},
      {path : "why-us", element : <WhyChooseUs />},
      {path : "feedback", element : <AboutUs />}
    ]
  }
])

const App = () => {
  const [user, setUser] = useState(null);

  const changeUserData = (userData) => {
    setUser(userData);
  };

  console.log(user);

  return (
    <>
      {/* <userContext.Provider value={{ user: user, changeUser: changeUserData }}>
        <Header />
        <Cars />
      </userContext.Provider>
      <Stats />
      <WhyChooseUs />
      <AboutUs />
      <Footer /> */}
      <userContext.Provider value={{ user: user, changeUser: changeUserData }}>
      <RouterProvider router={router} />
      </userContext.Provider>
    </>
  );
};

export default App;
