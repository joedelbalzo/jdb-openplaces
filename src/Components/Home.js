import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Home = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div id= 'welcomePage'>
      { auth.username }, (x) places open now.<br/>
      (x) more within 30 minutes.
    </div>
  );
};

export default Home;
