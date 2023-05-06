import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const places = (state = [], action)=> {
  if(action.type === 'SET_PLACES'){
    console.log('action', action.places)
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

export default places