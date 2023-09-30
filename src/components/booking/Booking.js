import React, { useRef, useContext, useState } from 'react';

import classes from './Booking.module.css';
import userContext from '../../store/user-context';

const Booking = (props) => {
  const ctx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successfullyBooked, setSuccessfullyBooked] = useState(false);
  const passwordRef = useRef();
  const date = new Date();

  const addOrderToDatabase = async () => {
    setLoading(true);
    try {
      const order = {
        username: ctx.user.username,
        car: props.carData,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        pickUp: ctx.user.pickUp,
        dropOff: ctx.user.dropOff
      };
      const res = await fetch(
        'https://car-rental-e95c0-default-rtdb.firebaseio.com/bookings.json',
        {
          method: 'POST',
          body: JSON.stringify(order),
        }
      );
      if (res.ok) {
        setLoading(false);
      }
    } catch (e) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (ctx.user.password !== passwordRef.current.value) {
      setError(true);
    } else {
      addOrderToDatabase();
      setError(false);
      setSuccessfullyBooked(true);
    }
  };
  return (
    <>
      {successfullyBooked ? (
        <h1>Successfully booked, click profile icon to see your dashboard</h1>
      ) : error === 'Something went wrong' ? (
        <h1>Something went wrong</h1>
      ) : loading ? (
        <h1>Loading ...</h1>
      ) : ctx.user && ctx.user.pickUp ? (
        <form onSubmit={submitHandler}>
          <h1>{props.carData.name}</h1>
          <ul className={classes.list}>
            <li>{props.carData.year}</li>
            <li>{props.carData.type}</li>
            <li>{props.carData.hp} HP</li>
          </ul>
          <label className={classes.label} htmlFor="password">
            Confirm password
          </label>
          <input
            className={classes.input}
            id="password"
            type="password"
            ref={passwordRef}
          />
          {error && <p className={classes.invalid}>Password is incorrect</p>}
          <div>
            <button className={classes.book}>Book</button>
          </div>
        </form>
      ) : (
        <h1>Please choose pick up and drop off locations</h1>
      )}
    </>
  );
};

export default Booking;
