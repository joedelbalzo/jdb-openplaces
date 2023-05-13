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
      console.log(auth, 'store')
      const token = window.localStorage.getItem('token')
      console.log('store token')
      const response = await axios.get(`/api/auth/favorites`, {
        headers: {
          authorization: token
        }  
      });
        console.log('store response', response)

      dispatch({type: 'SET_FAVORITES', favorites: response.data})
    };
  };
  

export default favorites