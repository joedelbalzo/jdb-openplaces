import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const About = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div id= 'aboutPage'>
      About.
      Hi!
      This data is currently hard-coded. Google API gets expensive.
      But eventually, this about page will say:
      This data is pulled from Google. Please don't be mad at me if it's outdated or if the location hasn't updated their Google profile.
      
      
    </div>
  );
};

export default About;
