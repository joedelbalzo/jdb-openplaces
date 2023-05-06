import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const places = (state = [], action)=> {
  if(action.type === 'SET_PLACES'){
    return action.places
  }
  return state
}

export const nearbyPlaces = (state = [], action) =>{
  if(action.type === 'SET_NEARBYPLACES'){
    return action.places
  }
  return state
  }

export const fetchPlaces = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/places');
    dispatch({type: 'SET_PLACES', places: response.data})
  };
};
export const fetchLocalPlaces = (search)=> {
  return async(dispatch)=> {
    const {lat, lng, radius, type} = search
    console.log(lat, lng, radius, type)
    const response = await axios.get('/api/places/nearby', {
      params: {lat: lat, lng: lng, radius: radius, type: type}
  });
    console.log(response)
    dispatch({type: 'SET_NEARBYPLACES', places: response.data})
  };
};

export default places