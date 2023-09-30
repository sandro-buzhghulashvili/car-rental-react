import React from 'react';

import classes from './whyChooseUs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faLocation,
  faTag,
  faDiamond,
  faCheck,
  faCancel,
} from '@fortawesome/free-solid-svg-icons';
import carImg from '../../assets/second-car-image.png';

const whyChooseUs = () => {
  return (
    <section className={classes['why-choose-us']} id="whyChooseUs">
      <h1 className={classes.caption}>
        WHY <span className={classes.orange}>CHOOSE US</span>
      </h1>
      <p className={classes.description}>
        Welcome to "Drive Mate", your ultimate destination for hassle-free and
        unforgettable car rental experiences. We understand that choosing the
        right car rental service can make all the difference in your journey,
        which is why we take great pride in offering you the following services
      </p>
      <div className={classes.services}>
        <img src={carImg} alt="mercedes s-class" />
        <div className={classes['service-list']}>
          <div className={classes.service}>
            <FontAwesomeIcon icon={faPhone} className={classes.icon} />
            <div>
              <h2>Customer Support</h2>
              <p>
                We understand that time is valuable, and we are committed to
                providing swift responses to your queries. Our team is available
                to address your needs promptly.
              </p>
            </div>
          </div>
          <div className={classes.service}>
            <FontAwesomeIcon icon={faLocation} className={classes.icon} />
            <div>
              <h2>Location</h2>
              <p>
                We have a network of conveniently located branches, spanning
                across various cities and popular destinations. You can easily
                find our car rental locations.
              </p>
            </div>
          </div>
          <div className={classes.service}>
            <FontAwesomeIcon icon={faTag} className={classes.icon} />
            <div>
              <h2>Best Price</h2>
              <p>
                Our Best Price Service goes the extra mile to compare prices
                from various car rental providers, ensuring that you get access
                to the best rates available in the market.
              </p>
            </div>
          </div>
          <div className={classes.service}>
            <FontAwesomeIcon icon={faDiamond} className={classes.icon} />
            <div>
              <h2>Experienced Drivers</h2>
              <p>
                Our experienced drivers are skilled professionals with a proven
                track record of safe and reliable driving.
              </p>
            </div>
          </div>
          <div className={classes.service}>
            <FontAwesomeIcon icon={faCheck} className={classes.icon} />
            <div>
              <h2>Verified Car Brand</h2>
              <p>
                Our car rental fleet consists of vehicles exclusively from
                well-known and reliable car manufacturers. We partner with
                trusted brands to ensure that you get a top-quality vehicle that
                meets your expectations and provides a comfortable and safe
                ride.
              </p>
            </div>
          </div>
          <div className={classes.service}>
            <FontAwesomeIcon icon={faCancel} className={classes.icon} />
            <div>
              <h2>Free Cancelation</h2>
              <p>
                Life can be unpredictable, and we believe in giving you the
                flexibility to adapt your travel plans without worry. Whether
                your trip gets rescheduled, postponed, or canceled, you can do
                so without incurring any cancellation fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default whyChooseUs;
