import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const About = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div id= 'aboutPage'>
      <div style={{textAlign: "center"}}>Hello!</div><br/>
      Welcome to Open Places.<br/><br/>
      <p style={{fontSize: "1.2rem"}}>
      Open Places is an innovative app designed to provide you with real-time information about open establishments in your desired area. By pinging your location, the app delivers a comprehensive list of all the nearby places that are currently open. Whether you're looking for options within half a mile or up to five miles, Open Places adapts to your location.<br/><br/>

      The inspiration for this app came from my experiences with my wife and our young son. As we took walks with him in his stroller, our schedule would vary depending on his sleep patterns. We often encountered the frustration of arriving at cafes that were still an hour away from opening or finding that the library had different hours for no apparent reason. Google's "open now" button required too many clicks to find what we needed. <br/><br/>

      The data in this app is currently hard-coded. Google's Places API requires separate calls for nearby places and place details, so during development, I manually added and seeded 30 restaurants, bars, museums, libraries, parks, and more. The code includes a switch to integrate Google's Places API, which would allow for real-time data retrieval with minimal effort. Once in production, decisions about the app's API budget allocation would be made, prioritizing features such as "opening soon" notifications tailored to your schedule. To keep costs down, the app currently provides extra details only for your favorite places, but there are opportunities to make this cost-effective while still providing an exciting user experience.<br/><br/>

      Although the data is currently hard-coded, you can still customize your default latitude, longitude, search radius, and favorite categories. This way, when we transition to the API, you'll have all your preferred options readily available. Enjoy the convenience of Open Places! If you have any questions, please feel free to reach out to jdelbalzo99@gmail.com. Thank you!<br/><br/>

      </p>
    </div>
  );
};

export default About;
