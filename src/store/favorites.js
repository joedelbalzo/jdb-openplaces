import axios from 'axios';

const favorites = (state = [], action)=> {
  if(action.type === 'SET_FAVORITES'){
    return action.favorites
  }
  if(action.type === 'ADD_FAVORITE'){
    return [action.favorite, ...state]
  }
  if(action.type === 'REMOVE_FAVORITE'){
    return state.filter(_fav => _fav.id !== action.favorite.id);
  }
  return state
}

  export const fetchUserFavorites = (auth)=> {
    return async(dispatch)=> {
      // console.log()
      const token = window.localStorage.getItem('token')
      const response = await axios.get(`/api/auth/favorites`, {
        headers: {
          authorization: token
        }  
      });
      dispatch({type: 'SET_FAVORITES', favorites: response.data})
    };
  };
  export const addUserFavorite= (place, auth)=> {
    return async(dispatch)=> {
      const token = window.localStorage.getItem('token')
      // console.log('add user favorite store func')
      const response = await axios.put(`/api/auth/favorites/add/`, {place}, {
        headers: {
          authorization: token
        }  
      });
      // console.log('STORE RESPONSE TO ADD', response.data)
      dispatch({type: 'ADD_FAVORITE', favorite: response.data})
    };
  };
  export const removeUserFavorite= (place, auth)=> {
    return async(dispatch)=> {
      const token = window.localStorage.getItem('token')
      // console.log('remove user favorite store func', place.id)
      const response = await axios.delete(`/api/auth/favorites/remove/${place.id}`, {
        headers: {
          authorization: token
        }  
      });
      dispatch({ type: 'REMOVE_FAVORITE', favorite: place });
    };
  };

  

export default favorites