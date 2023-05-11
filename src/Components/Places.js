// react imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'

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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { fontWeight } from '@mui/system';



//component imports

//store imports
import { fetchNearbyPlaces } from '../store';
import places from '../store/places';



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

const Places = ()=> {
  const { nearbyPlaces, auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentCoords, setCurrentCoords]=useState(null)
  const [previousCoords, setPreviousCoords] = useState('');
  const [previousFetchTime, setPreviousFetchTime] = useState(0);  
  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);

  const { settingHomeLat, settingHomeLng, settingRadius, settingFavCategories } = auth;
    
  
  useEffect(() => {
    const { settingHomeLat, settingHomeLng, settingRadius, settingFavCategories } = auth;
    
    let lat, lng;
      if (currentCoords) {
        lat = currentCoords.lat;
        lng = currentCoords.lng;
      } else {
        lat = settingHomeLat;
        lng = settingHomeLng;
      }
        let radius = settingRadius
        let type = settingFavCategories
        dispatch(fetchNearbyPlaces({lat, lng, radius, type}))
    //     // setPreviousCoords(currentCoords || {lat: settingHomeLat, lng:settingHomeLng});
    //     // setPreviousFetchTime(Date.now());
    // 
    
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   setCurrentCoords({
    //      lat: position.coords.latitude,
    //      lng: position.coords.longitude})
    //     console.log('actual', lat, 'actual', lng)
    // })
  }, []);



  {if(!nearbyPlaces){return null}}


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
  const googleTimePlus =(timeAdded) => {
  const currentTime = new Date();
  const newTime = new Date(currentTime.getTime() + timeAdded * 60000);
  const hours = newTime.getHours()
  const minutes = newTime.getMinutes()
  return (parseFloat(`${hours < 10 ? '0' + hours : hours}${minutes < 10 ? '0' + minutes : minutes}`));
  }

  const openNow = () => {
    const placesWithHours = nearbyPlaces.filter(place => place.opening_hours)   
    const today = googleDate()
    const time = googleTime()
    const placesOpenNow = []
    for (let place of placesWithHours){
      for (let hours of place.opening_hours){
        if (hours.open.day === today && time > hours.open.time && time < hours.close.time){
          placesOpenNow.push(place)
        }
      }
    }
    return placesOpenNow
  }

  const openSoon = (timeQueried) => {
    const placesWithHours = nearbyPlaces.filter(place => place.opening_hours)
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

  const closingSoon = (timeQueried) => {
    const placesWithHours = nearbyPlaces.filter(place => place.opening_hours)
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

    const distance = (lat1, lon1, lat2, lon2) => {
      const p = 0.017453292519943295;    // Math.PI / 180
      const c = Math.cos;
      const a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
      const distance = 12742 * Math.asin(Math.sqrt(a))*0.621371
      return distance
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

  return (   
    <>
    <div> 
    <div id= 'welcomePage'>
      { capitalizeFirstLetter(auth.username || '') }, {openNow().length} places are open now.<br/>
      {openSoon(130).length === 0 ? '': `${openSoon(130).length} more within 30 minutes.`}<br/>
      {closingSoon(300).length === 0 ? '' : `${closingSoon(300).length} will close within five hours.`}<br/>
      
    </div>
    {/* maybe some buttons for sort by category, distance, rating? */}

    {auth.settingFavCategories?.map( category => { return (
      <div id="categoryContainer">
        <div id ="categoryHeader">
         {category.split('_').join(' ')}
        </div>
        <div>
          {[...openNow(), ...openSoon(130)]
            .filter(place => place.types.includes(category))          
            .map( (place, i) => { return ( 
              <div>
                {openSoon(place)}
            <Card 
            key={place.id}
            sx={{ 
              maxWidth: '700px',
              width: '90%',
              marginTop: '1rem',
              mx: 'auto',
              // borderTop: 1,
              borderBottom: 1
               }}>
                  <CardHeader
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
                    { openSoon(130).includes(place) ? <span id="opensSoon">opens soon, hang on!</span> : ''}
                    { closingSoon(300).includes(place) ? <span id="opensSoon">closes soon! go go go!</span> : ''}
                    <Typography variant="body1" color="text.secondary" textAlign={'left'}>
                      Address: {place.formatted_address}<br/>
                      Distance: {placeDistance(auth.settingHomeLat, auth.settingHomeLng, place.geometry) <.1 ? 'Less than .1 miles away!' : `${Math.floor(Math.round(placeDistance(auth.settingHomeLat, auth.settingHomeLng, place.geometry)*10))/10} miles away`}
                      <br/>
                      Google Rating: {place.rating}


                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
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
      ) 
      }
      )
    }
  </div>
  </>
  )
}


export default Places;