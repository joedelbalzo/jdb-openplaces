import React, { useEffect, useRef } from 'react';
import Settings from './Settings';
import Favorites from './Favorites';
import HomeNav from './HomeNav'
import Login from './Login';
import NearbyPlaces from './NearbyPlaces'
import About from './About'
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';


const App = ()=> {
  const { auth, places } = useSelector(state => state);
  const prevAuth = useRef(auth)
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

useEffect(()=> {
  if(!prevAuth.current.id && auth.id){
    console.log('you just logged in')
  }
  if(!prevAuth.current.id && !auth.id){
    console.log('you just logged out')
  }
},[auth])

  return (
      <div>
        <HomeNav />
        <Routes>
          <Route
            path="/"
            element={auth.id ? <Navigate to="/places" /> : <Login />}
          />

          <Route path="/places" element={auth.id ? <NearbyPlaces />  : <Login />} />
          <Route path="/home" element={auth.id ? <NearbyPlaces />  : <Login />} />
          <Route path="/settings" element={auth.id ? <Settings />  : <Login />} />
          <Route path="/favorites" element={auth.id ? <Favorites />  : <Login />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
};


export default App;
