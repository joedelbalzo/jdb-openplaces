import React, { useEffect, useRef } from 'react';
import Home from './Home';
import Settings from './Settings';
import HomeNav from './HomeNav'
import Login from './Login';
import NearbyPlaces from './NearbyPlaces'
import About from './About'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaces, loginWithToken } from '../store';
import { Link, Routes, Route, Navigate } from 'react-router-dom';


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

          <Route path="/places" element={<NearbyPlaces />} />
          <Route path="/home" element={<NearbyPlaces />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    );
    


    // <div>
    //   <HomeNav/>
    //   {
    //     auth.id ? <NearbyPlaces /> : <Login />
    //   }
    //   {
    //     !!auth.id  && (
    //       <div id="placesPage">
    //         {
    //            <NearbyPlaces />
    //         }

    //       </div>
    //     )
    //   }
    //     <Routes>
    //       <Route path="/settings" element={<Settings/>}/>
    //     </Routes>

    // </div>
  // );
};


export default App;
