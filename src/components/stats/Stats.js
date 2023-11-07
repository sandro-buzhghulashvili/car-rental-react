import React from 'react';

import classes from './Stats.module.css';

const Stats = () => {
  return (
    <div className={classes.stats} id="stats">
      <h1 className={classes.caption}>
        OUR <span>NUMBERS</span>
      </h1>
      <div className={classes.numbers}>
        <div>
          <h1>
            <span>5000</span>+
          </h1>
          <p>Active Clients</p>
        </div>
        <div>
          <h1>
            <span>65000</span>+
          </h1>
          <p>Car Models</p>
        </div>
        <div>
          <h1>
            <span>24</span>+
          </h1>
          <p>Countries Served</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
