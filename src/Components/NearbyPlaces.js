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
import { ExpandLessTwoTone } from '@mui/icons-material';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//component imports

//store imports
import { fetchNearbyPlaces } from '../store';



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
  const { nearbyPlaces, auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [center, setCenter] = useState(null);
  const [mapRadius, setMapRadius] = useState('')
  const [category, setCategory] = useState('')



  useEffect(() => {
  // navigator.geolocation.getCurrentPosition(function (position) {
  //   setCenter({
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude,
  //   });
  // });
  let lat = auth.settingHomeLat
  let lng = auth.settingHomeLng
  let radius = auth.settingRadius
  let type = auth.settingFavCategories
  dispatch(fetchNearbyPlaces({lat, lng, type, radius}))

  }, []);

  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);

  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
    setExpanded(false)
    
  };
  
  const handleCategory = ev => {
    setCategory(ev.target.value)
  }

  const categorySort = ["amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "cafe","car_wash", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "department_store", "doctor", "drugstore", "electronics_store",
 "florist", "furniture_store", "gas_station", "gym", "hair_care", "hardware_store", "home_goods_store", "hospital", "laundry", "lawyer", "library", "liquor_store", "lodging", "meal_delivery", "meal_takeaway", "mosque", "movie_rental", "movie_theater", "museum", "park", "parking", "pet_store", "pharmacy", "primary_school", "restaurant", "school", "shoe_store", "shopping_mall", "spa", "stadium", "store", "supermarket", "tourist_attraction", "train_station", "transit_station", "university", "zoo"];
  
  const googleDate = () => {
    return new Date().getDay()
  }

  const googleTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    return (parseFloat(`${hours < 10 ? '0' + hours : hours}${minutes < 10 ? '0' + minutes : minutes}`));
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
    return placesWithHours.filter(place => place.opening_hours.open_now === true)
    }

  const openSoon = (time) => {
    const placesWithHours = nearbyPlaces.filter(place => place.opening_hours)
    const placesWithHoursButClosed = placesWithHours.filter (place => place.opening_hours.open_now === false)
    const idx = googleDate()
    const openSoonPlaces = []
    for (let place of placesWithHoursButClosed){
    if(googleTimePlus(time) >= place.openingHours.periods[idx].open.time){
      openSoonPlaces.push(place)
    }}
    return openSoonPlaces
  }

  const closingSoon = (time) => {
    const placesWithHours = nearbyPlaces.filter(place => place.opening_hours)
    const placesWithHoursButOpen = placesWithHours.filter (place => place.opening_hours.open_now === true)
    const idx = googleDate()
    const closingSoonPlaces = []
    for (let place of placesWithHoursButOpen){
    if((idx +1)!==(place.openingHours.periods[idx].close.day) && googleTimePlus(time) >= place.openingHours.periods[idx].close.time){
      closingSoonPlaces.push(place)
    }}
    console.log(closingSoonPlaces)
    return closingSoonPlaces
  }
  
  const closedNow = () => {
    const placesWithHours = nearbyPlaces.filter(place => place.opening_hours)
    return placesWithHours.filter(place => place.opening_hours.open_now === false)
    }

  
  function getDistance(lat1, lng1, lat2, lng2) {
      const earthRadius = 6371; // Earth's radius in kilometers
      const dLat = degToRad(lat2 - lat1);
      const dLng = degToRad(lng2 - lng1);
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = earthRadius * c * 0.621371
      if(distance < .1){return 'Less than 0.1 miles away!'}
      return `${Math.floor(Math.round(distance*10))/10} miles away`;
    }
    
    function degToRad(degrees) {
      return degrees * (Math.PI/180);
    }

  return (   
    <>
    <div> 

    <div id= 'welcomePage'>
      { auth.username }, {openNow().length} places are open now.<br/>
      {openSoon(30).length === 0 ? '': `${openSoon(30).length} more within 30 minutes.`}<br/>
      {closingSoon(60).length === 0 ? '' : `${closingSoon(60).length} will close within an hour.`}<br/>
      
    </div>
    {/* maybe some buttons for sort by category, distance, rating? */}
    
    {auth.settingFavCategories.map( category => { return (
      <div id="categoryContainer">
        <div>
         {category}
        </div>
        <div>
          {nearbyPlaces
            .filter(place => place.types.includes(category))          
            .map( (place, i) => { return ( 
              <div>
                {openSoon(place)}
            <Card 
            sx={{ 
              maxWidth: '500px',
              // width: '75%',
              marginTop: '1rem',
              mx: 'auto',
              borderBotton: "2px solid #DAF0EE"

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
                  height="300"
                  image={place.photos[0]}
                  />
                  <CardContent>
                    { place.opening_hours.open_now === false ? <span id="opensSoon">opens soon, hang on!</span> : ''}

                    <Typography variant="body1" color="text.secondary" textAlign={'left'}>
                      Address: {place.vicinity}<br/>
                      Distance: {getDistance(auth.settingHomeLat, auth.settingHomeLng, place.geometry.location.lat, place.geometry.location.lng)}<br/>
                      Google Rating: {place.rating} with {place.user_ratings_total} reviews.


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
                    container="true"
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    textAlign="left"
                    rowSpacing={1} 
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Typography item paragraph>
                        <item>
                        Open:
                          <li style={{listStyleType:"none"}}>{place.openingHours.weekday_text[0]}</li> 
                          <li style={{listStyleType:"none"}}>{place.openingHours.weekday_text[1]}</li> 
                          <li style={{listStyleType:"none"}}>{place.openingHours.weekday_text[2]}</li> 
                          <li style={{listStyleType:"none"}}>{place.openingHours.weekday_text[3]}</li> 
                          <li style={{listStyleType:"none"}}>{place.openingHours.weekday_text[4]}</li> 
                          <li style={{listStyleType:"none"}}>{place.openingHours.weekday_text[5]}</li> 
                          <li style={{listStyleType:"none"}}>{place.openingHours.weekday_text[6]}</li>
                        </item>
                      </Typography>
                      <Typography item paragraph>
                      <item>
 
                        </item>
                        
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


export default NearbyPlaces;