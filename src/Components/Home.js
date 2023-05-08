import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Home = ()=> {
  const { auth, places } = useSelector(state => state);
  const dispatch = useDispatch();


  return (
    <div id= 'welcomePage'>
      { auth.username }, {places.length} places are open now.<br/>
      (x) more within 30 minutes.
    </div>
  );
};

export default Home;
