import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import NearbyPlaces from './NearbyPlaces';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();


  return (
    <></>
    // <div id= 'home'>
    //   <Login/>
    //   {auth.id ? <Login/> : <NearbyPlaces/>}
    // </div>
  );
};

export default Home;
