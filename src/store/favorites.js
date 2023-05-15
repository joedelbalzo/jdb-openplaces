import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const favorites = (state = [], action)=> {
  if(action.type === 'SET_FAVORITES'){
    return action.favorites
  }
  return state
}

  export const fetchUserFavorites= (auth)=> {
    return async(dispatch)=> {
      const token = window.localStorage.getItem('token')
      const response = await axios.get(`/api/auth/favorites`, {
        headers: {
          authorization: token
        }  
      });
      dispatch({type: 'SET_FAVORITES', favorites: response.data})
    };
  };
  export const addUserFavorite= (auth)=> {
    return async(dispatch)=> {
      const token = window.localStorage.getItem('token')
      console.log('add user favorite store func')
      const response = await axios.put(`/api/auth/favorites/`, Place, auth, {
        headers: {
          authorization: token
        }  
      });
      dispatch({type: 'ADD_FAVORITES', favorites: response.data})
    };
  };
  export const removeUserFavorite= (place, auth)=> {
    return async(dispatch)=> {
      const token = window.localStorage.getItem('token')
      // console.log(token)
      console.log('remove user favorite store func', place, auth)
      const response = await axios.put(`/api/auth/favorites/${place.id}`, place, auth, {
        headers: {
          authorization: token
        }  
      });
      console.log(response, 'response')
      dispatch({type: 'REMOVE_FAVORITES', favorites: response.data})
    };
  };

  

export default favorites