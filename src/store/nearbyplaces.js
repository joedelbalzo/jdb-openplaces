import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const nearbyPlaces = (state = [], action)=> {
  if(action.type === 'SET_NEARBYPLACES'){
    return action.places
  }
  return state
}


export const fetchNearbyPlaces = (search)=> {
  return async(dispatch)=> {
    const {lat, lng, radius, type} = search
    const response = await axios.get('/api/places/nearby', {
      params: {lat: lat, lng: lng, radius: radius, type: type}
  });
      dispatch({type: 'SET_NEARBYPLACES', places: response.data})
  };
};


export default nearbyPlaces