import React, { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import userContext from '../../store/user-context';
import classes from './ChooseLocation.module.css';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FuZHJvYnV6aGdodWxhc2h2aWxpIiwiYSI6ImNsMXhrc2V3ZjAzdWIzYmxmaGp4NjQ4cXcifQ.9DC-MgCSwWlayG6Ww11H7Q';

const ChooseLocation = (props) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationIsValid, setLocationIsValid] = useState(true);

  const ctx = useContext(userContext);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Replace with your desired map style
      center: [43.1652841, 41.8314314, 7], // Replace with your initial map center coordinates
      zoom: 5, // Replace with your initial zoom level
      showAttribution: false,
    });

    mapRef.current = map;

    // Optional: Add any additional map configuration or interactions here

    map.on('click', handleMapClick);

    return () => {
      map.remove();
      map.off('click', handleMapClick);
    }; // Clean up the map instance when the component is unmounted
  }, []);

  useEffect(() => {
    if (locations.length === 2) {
      setLocationIsValid(true);
    } else {
      setLocationIsValid(false);
    }
  }, [locations]);

  if (locations.length > 2) {
    setLocations((prevValue) => prevValue.slice(1, prevValue.length));
  }

  const handleMapClick = (event) => {
    const map = mapRef.current;
    const { lng, lat } = event.lngLat;

    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features[0].place_name) {
          const newMarker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);

          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
          setLocations((prevValue) => [
            ...prevValue,
            data.features[0].place_name,
          ]);
        }
        // You can access the place information from the 'data' object
      })
      .catch((error) => {
        console.error('Error fetching location info:', error);
      });
  };

  if (markers.length > 2) {
    const [firstMarker, ...remainingMarkers] = markers;
    firstMarker.remove();
    setMarkers(remainingMarkers);
  }

  const handleZoomIn = () => {
    const map = mapRef.current;
    map.zoomIn();
  };

  const handleZoomOut = () => {
    const map = mapRef.current;
    map.zoomOut();
  };

  const addLocationsToDatabase = async (user) => {
    const currentUserId = ctx.user.id;

    const updatedUser = { [currentUserId]: user };
    ctx.changeUser(user);

    const res = await fetch(
      `https://car-rental-e95c0-default-rtdb.firebaseio.com/users.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      }
    );
  };

  const handleSave = () => {
    const newObj = {
      ...ctx.user,
      pickUp: locations[0],
      dropOff: locations[1],
    };
    ctx.changeUser(newObj);
    addLocationsToDatabase(newObj);
    props.onChooseLocations();
  };

  return (
    <>
      <section className={classes.main}>
        <h2>
          Click the appropriate regions on the map to select pick up and drop
          off locations{' '}
        </h2>
        <div className={classes.map} ref={mapContainerRef} />
        <div className={classes.zoom}>
          <button onClick={handleZoomIn}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={handleZoomOut}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div className={classes.locations}>
          <p>Pick up location : {locations[0]}</p>
          <p>Drop off location : {locations[1]}</p>
          {!locationIsValid && (
            <p className={classes.error}>Please enter both locations</p>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={!locationIsValid}
          className={classes.save}
        >
          Save
        </button>
      </section>
    </>
  );
};

export default ChooseLocation;
