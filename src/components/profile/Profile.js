import React, { useContext, useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import userContext from '../../store/user-context';
import classes from './Profile.module.css';

const Profile = (props) => {
  const [orders, setOrders] = useState([]);
  const [toggleOrders, setToggleOrders] = useState(false);
  const ctx = useContext(userContext);

  const logoutHandler = () => {
    props.onCloseProfile();
    ctx.changeUser(null);
  };

  const fetchOrders = async () => {
    const res = await fetch(
      'https://car-rental-e95c0-default-rtdb.firebaseio.com/bookings.json'
    );
    const data = await res.json();

    let transformedArray = [];

    if (res.ok) {
      for (let i in data) {
        if (data[i].username === ctx.user.username) {
          const obj = {
            ...data[i],
            id : i
          }
          transformedArray.push(obj);
        }
      }
    }

    setOrders(transformedArray);
  };

  const deleteOrderFromDB = async (id) => {
    const res = await fetch(`https://car-rental-e95c0-default-rtdb.firebaseio.com/bookings/${id}.json`, {
      method : "DELETE"
    })
    const data = await res.json()
  }

  const cancelOrder = (order) => {
    deleteOrderFromDB(order.id)
    setOrders(orders.filter(element => element.id !== order.id))
  }

  const toggleHandler = () => {
    setToggleOrders((prevValue) => !prevValue);
  };


  const allOrders = orders.map((order) => {
    return (
      <div className={classes.order} key={nanoid()}>
        <p>Car : {order.car.name}</p>
        <p>Date : {order.date}</p>
        <p>Pick up location : {order.pickUp}</p>
        <p>Drop off location : {order.dropOff}</p>
        <button className={classes.cancel} onClick={() => {cancelOrder(order)}}>Cancel order</button>
      </div>
    );
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={classes.dashboard}>
      <p>User : {ctx.user.username}</p>
      <p>
        Pick up location : {ctx.user.pickUp ? ctx.user.pickUp : 'Not chosen'}
      </p>
      <p>
        Drop off location : {ctx.user.dropOff ? ctx.user.dropOff : 'Not chosen'}
      </p>
      {orders.length > 0 && (
        <div
          className={`${classes.orders} ${toggleOrders ? classes.toggle : ''}`}
        >
          <span onClick={toggleHandler}>
            Bookings{' '}
            <FontAwesomeIcon icon={toggleOrders ? faArrowUp : faArrowDown} />
          </span>
          {allOrders}
        </div>
      )}
      <button onClick={logoutHandler}>Log out</button>
    </div>
  );
};

export default Profile;
