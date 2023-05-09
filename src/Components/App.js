import React, { useEffect } from 'react';
import Settings from './Settings';
import HomeNav from './HomeNav'
import Login from './Login';
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
      <div id="placesPage">
        
        {
          (!auth.id) ? <NearbyPlaces /> :  <Login />
        }
      </div>
        <Routes>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
    </div>
  );
};

export default App;
