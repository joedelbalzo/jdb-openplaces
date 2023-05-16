// react imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'

// mui imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Button } from '@mui/material';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';


//component imports

//store imports
import { fetchNearbyPlaces, editUserFavorites, fetchUserFavorites, addUserFavorite, removeUserFavorite  } from '../store';




const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const NearbyPlaces = ()=> {
  const { nearbyPlaces, auth, favorites } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentCoords, setCurrentCoords]=useState(null)
  const [previousCoords, setPreviousCoords] = useState('');
  const [previousFetchTime, setPreviousFetchTime] = useState(0);  
  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryName, setCategoryName]=useState('')

  
  useEffect(() => {
    dispatch(fetchUserFavorites())
    const { settingHomeLat, settingHomeLng, settingRadius, settingFavCategories } = auth;
    
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude})
        console.log('actual', lat, 'actual', lng)
      })
      
      let lat, lng;      
      if (currentCoords) {
        lat = currentCoords.lat;
        lng = currentCoords.lng;
      } else {
        lat = settingHomeLat;
        lng = settingHomeLng;
      }
      let radius = settingRadius
      let type = settingFavCategories[0]
      dispatch(fetchNearbyPlaces({lat, lng, radius, type}))
      setCategoryName(type)
      setSelectedCategory(type)
      
    }, []);
    
    useEffect(() => {
      dispatch(fetchUserFavorites())
    }, []);
    
    if(!nearbyPlaces)return null
    if(!auth){navigate('../')}
    
    
    const handleFavoriteClick = (place) => {
      // console.log(place)
      if(favorites.includes(place)){
        // console.log('already a favorite, going to unfavorite!')
        dispatch(removeUserFavorite(place, auth))
        // setFavorites(favorites.filter(_fav => _fav.id !== action.favorite.id))
        
      }
      if(!favorites.includes(place)){
        // console.log('NOT already a favorite, going to favorite!')
        dispatch(addUserFavorite(place, auth))
      }
      dispatch(fetchUserFavorites())
    };
    

    const handleExpandClick = i => {
      setExpandedId(expandedId === i ? -1 : i);
      setExpanded(false)
    };
    
  const googleDate = () => {
    return new Date().getDay()
  }

  const googleTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    return (parseInt(`${hours < 10 ? '0' + hours : hours}${minutes < 10 ? '0' + minutes : minutes}`));
  } 
  const openNow = (category) => {
    // for seeded data
    let placesWithHours = nearbyPlaces.filter(place => place.opening_hours).filter(place => place.types.includes(category))
    const today = googleDate()
    const time = googleTime()
    const placesOpenNow = []
    for (let place of placesWithHours){
      for (let hours of place.opening_hours){
        if (hours.open.day === today && time > hours.open.time){
          if(hours.open.day === hours.close.day && time < hours.close.time)
          {placesOpenNow.push(place)}
         if (hours.open.day !== hours.close.day){
          let afterMidnight = (hours.close.time*1) + 2400
          if (time < afterMidnight)
           {placesOpenNow.push(place)}
         }
        }
      }
    }
    return placesOpenNow
    // for fetched data
    // return nearbyPlaces.filter(place => place.opening_hours.open_now === true)
  }
  
 const fetchByCategory = (ev) => {
   let lat, lng;
   if (currentCoords) {
     lat = currentCoords.lat;
     lng = currentCoords.lng;
   } else {
     lat = auth.settingHomeLat;
     lng = auth.settingHomeLng;
   }
    let type = ev.target.value
    let radius = auth.settingRadius
    dispatch(fetchNearbyPlaces({lat, lng, radius, type}))
    setCategoryName(type)
    setSelectedCategory(type);
  }


    const placeDistance = (lat1, lon1, placeGeometry) => {
      const {lat, lng} = placeGeometry.location
      const p = 0.017453292519943295;    // Math.PI / 180
      const c = Math.cos;
      const a =
        0.5 -
        c((lat - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat * p) * (1 - c((lng - lon1) * p))) / 2;
      const distance = 12742 * Math.asin(Math.sqrt(a))*0.621371
      return distance
    }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function pluralize(word, count) {
    if (count === 1) {
      return word;
    } 
      else if (word === "bowling_alley"){
        return word + 's';
    } else if (word.endsWith('y')) {
      return word.slice(0, -1) + (count === 0 || count > 1 ? 'ies' : 'y');
    } else {
      return word + 's';
    }
  }



  const openSoon = (timeQueried, category) => {
    const placesWithHours = nearbyPlaces.filter(place => place.opening_hours).filter(place => place.types.includes(category))
    const today = googleDate()
    const time = googleTime()
    const placesOpenSoon = []
    for (let place of placesWithHours){
      for (let hours of place.opening_hours){
        if (hours.open.day === today && time < (hours.open.time)*1 && (time > (hours.open.time*1)-timeQueried)){
          placesOpenSoon.push(place)
        }
      }
    }
    return placesOpenSoon
  }

  const closingSoon = (timeQueried, category) => {
    const placesWithHours = nearbyPlaces.filter(place => place.opening_hours).filter(place => place.types.includes(category))
    const today = googleDate()
    const time = googleTime()
    const placesClosingSoon = []
    for (let place of placesWithHours){
      for (let hours of place.opening_hours){
        if ((hours.open.day === today || hours.open.day === today+1) && (time < (hours.close.time)*1 && time > (hours.close.time)*1 - timeQueried)){
          placesClosingSoon.push(place)
        }
      }
    }
    return placesClosingSoon
  }
console.log(favorites, 'favorites')


  return (   
    <>
    <div> 
    <div id= 'welcomePage'>
      { capitalizeFirstLetter(auth.username || '') }, {openNow(categoryName).length} {openNow(categoryName).length === 1 ? `${categoryName.split('_').join(' ')} is` : `${pluralize(categoryName, 0).split('_').join(' ')} are`}  open now!<br/>
      <div id="welcomeSmaller">
      {openSoon(30).length === 0 ? '': `${openSoon(30).length} more within 30 minutes.`}<br/>
      {closingSoon(120).length === 0 ? '' : `${closingSoon(120).length} will close within two hours.`}<br/>
    </div></div>

    <div id='categoryButtonContainer'>
    {auth.settingFavCategories?.map( category => { return (
        <Button 
          key={category}

          variant="outlined" 
          // size="large" 
          sx={{
            fontSize: '2rem',
            marginBottom: '1rem',
            backgroundColor: selectedCategory === category ? '#1C5D99;' : 'transparent',
            color: selectedCategory === category ? 'white' : 'black',
            "&:hover": {
              color: 'white',
              backgroundColor: selectedCategory === category ? '#1C5D99;' : '#A2A3BB'
            }
          }}
          onClick={(ev) => (fetchByCategory(ev))} 
          value={category} 
          id={category}
          >
            {pluralize(category, 0).split('_').join(' ')}
          </Button>
        )})}
        </div>

      <div id="categoryContainer">
        <div id ="categoryHeader">
        {pluralize(categoryName, 0).split('_').join(' ')}
        </div>
        <div>
          {openNow(categoryName)
            .filter(place => place.types.includes(categoryName))
            .map( (place, i) => { 
              const isFavorite = favorites.includes(place)
              return ( 
              <div key={place.id}>
                
            <Card 
            sx={{ 
              maxWidth: '700px',
              width: '90%',
              marginTop: '1rem',
              mx: 'auto',
              borderRight: 1,
              borderBottom: 1,
              borderColor: "#A2A3BB"
               }}>
                  <CardHeader
                    sx={{
                      fontSize: "5rem"
                    }}
                    action={
                      <IconButton aria-label="settings">
                      </IconButton>
                    }
                    title={place.name}
                  />
                  <CardMedia
                  component="img"
                  alt={place.name}
                  height="400"
                  image={place.photo}
                  />
                  <CardContent>
                    <Typography variant="body1" color="text.secondary" textAlign={'left'}>
                      Address: {place.vicinity || place.formatted_address}<br/>
                      Distance: {placeDistance(auth.settingHomeLat, auth.settingHomeLng, place.geometry) <.1 ? 'Less than .1 miles away!' : `${Math.floor(Math.round(placeDistance(auth.settingHomeLat, auth.settingHomeLng, place.geometry)*10))/10} miles away`}
                      <br/>
                      Google Rating: {place.rating} with {place.user_ratings_total} reviews.


                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites"  onClick={() => handleFavoriteClick(place)}  
                    className={isFavorite ? 'favoriteButton' : 'notFavoriteButton'}>
                     {isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={() => handleExpandClick(i)}
                      aria-expanded={expandedId === i}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                    <Grid 
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    textAlign="left"
                    rowSpacing={1} 
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Typography paragraph>
                        
                      Open:
                          <li style={{listStyleType:"none"}}>{place.weekday_text[0]}</li> 
                          <li style={{listStyleType:"none"}}>{place.weekday_text[1]}</li> 
                          <li style={{listStyleType:"none"}}>{place.weekday_text[2]}</li> 
                          <li style={{listStyleType:"none"}}>{place.weekday_text[3]}</li> 
                          <li style={{listStyleType:"none"}}>{place.weekday_text[4]}</li> 
                          <li style={{listStyleType:"none"}}>{place.weekday_text[5]}</li> 
                          <li style={{listStyleType:"none"}}>{place.weekday_text[6]}</li>                        
                      </Typography>
                      <Typography paragraph>
                      
 
                        
                        
                      </Typography>
                      
                    </Grid>
                  </Collapse>
                </Card>
                </div>
                )
              }
              )
            }
            <br/>
        </div>
      </div>
  </div>
  </>
  )
}


export default NearbyPlaces;