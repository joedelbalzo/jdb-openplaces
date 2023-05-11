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

const NearbyPlaces = ()=> {
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

  console.log(nearbyPlaces, 'in nearbyPlaces component')
  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
    setExpanded(false)
    
  };

  const googleDate = () => {
    return new Date().getDay()
  }

  const openNow = () => {
    return nearbyPlaces.filter(place => place.opening_hours.open_now === true)
  }

  const googleTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    return (parseInt(`${hours < 10 ? '0' + hours : hours}${minutes < 10 ? '0' + minutes : minutes}`));
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
      
    </div>
    {/* maybe some buttons for sort by category, distance, rating? */}
    {/* {maybe map some buttons here for category fetches?} */}
    {auth.settingFavCategories?.map( category => { return (
      <div id="categoryContainer">
        <div id ="categoryHeader">
         {category.split('_').join(' ')}
        </div>
        <div>
          {nearbyPlaces
            .map( (place, i) => { return ( 
              <div>
                {place.name}
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
                  image={place.photos}
                  />
                  <CardContent>
                    <Typography variant="body1" color="text.secondary" textAlign={'left'}>
                      Address: {place.vicinity}<br/>
                      Distance: {placeDistance(auth.settingHomeLat, auth.settingHomeLng, place.geometry) <.1 ? 'Less than .1 miles away!' : `${Math.floor(Math.round(placeDistance(auth.settingHomeLat, auth.settingHomeLng, place.geometry)*10))/10} miles away`}
                      <br/>
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
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    textAlign="left"
                    rowSpacing={1} 
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Typography paragraph>
                        
gotta figure out what goes here now. maybe notes based on a place id? price level?
                        
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


export default NearbyPlaces;