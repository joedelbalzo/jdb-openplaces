import React, { useEffect } from 'react';
import Home from './Home';
import HomeNav from './HomeNav'
import Login from './Login';
import Places from './Places';
import NearbyPlaces from './NearbyPlaces'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaces, loginWithToken } from '../store';
import { Link, Routes, Route } from 'react-router-dom';


const App = ()=> {
  const { auth, places } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <HomeNav/>
      {
        auth.id ? <Home /> : <Login />
      }
      {
        !!auth.id  && (
          <div id="placesPage">
            {
              (auth.id) ? <NearbyPlaces />:''
            }

          </div>
        )
      }
    </div>
  );
};

export default App;
