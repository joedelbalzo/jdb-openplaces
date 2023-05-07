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

  // const [nearbyPlaces, setNearbyPlaces] = useState('')
  const [center, setCenter] = useState(null);
  const [mapRadius, setMapRadius] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
  navigator.geolocation.getCurrentPosition(function (position) {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
  }, []);

  const tryToGetPlaces = () =>{
    let lat = center.lat
    let lng = center.lng
    let radius = 500
    let type = category
    const response = dispatch(fetchNearbyPlaces({lat, lng, type, radius}))
    navigate('/places/nearby')
  }

  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);

  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };
  
  const handleCategory = ev => {
    setCategory(ev.target.value)
  }

  const placeCategories = () => {
    const categories = []
    // for(let place of nearbyPlaces){
    //   if (!categories.includes(place.category)){
    //     categories.push(place.category.toLowerCase())
    //   }
    // }
    return categories.sort()
  }
  const categories = placeCategories()

  // form "umbrella categories, would probably have to sort within the placeCategories function first, like if umbrellaCategory.includes(category){push to umbrella category"

  const categorySort = ["amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "cafe","car_wash", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "department_store", "doctor", "drugstore", "electronics_store",
 "florist", "furniture_store", "gas_station", "gym", "hair_care", "hardware_store", "home_goods_store", "hospital", "laundry", "lawyer", "library", "liquor_store", "lodging", "meal_delivery", "meal_takeaway", "mosque", "movie_rental", "movie_theater", "museum", "park", "parking", "pet_store", "pharmacy", "primary_school", "restaurant", "school", "shoe_store", "shopping_mall", "spa", "stadium", "store", "supermarket", "tourist_attraction", "train_station", "transit_station", "university", "zoo"];
  
  if(nearbyPlaces){console.log('HEY WE WIN', nearbyPlaces)}
  const nearPlaces = nearbyPlaces.map(place => place)
  console.log('NEAR PLACES', nearPlaces)

  return (   
    <>
    <div> 
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Category Choices</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="Category"
        onChange={handleCategory}
      >
          {categorySort.map((category) => {
            return (
              <MenuItem value={category}>{category}</MenuItem>
            )
          })}
      </Select>
    </FormControl>


      <button onClick={tryToGetPlaces}>Go Go GO!</button>
    {categories.map( category => { return (
      <div>
        <div>
         {category}
        </div>
        <div>
          {/* {nearbyPlaces.status === 'ZERO-RESULTS' ? 'No results are open in your radius' : ( */}
          {nearPlaces
            // .filter(place => place.types.includes(category))          
            .map( (place, i) => { return ( 
              <div>
                {place.name}
              </div>
            // <Card 
            // sx={{ 
            //   width: '75%',
            //   marginTop: '1rem',
            //   mx: 'auto',
            //   borderBotton: "2px solid #DAF0EE"

            //    }}>
            //       <CardHeader
            //         action={
            //           <IconButton aria-label="settings">
            //           </IconButton>
            //         }
            //         title={place.name}
            //       />
            //       <CardMedia
            //         component={"image"}
            //         //an image would go here
            //       />
            //       <CardContent>
            //         <Typography variant="body2" color="text.secondary">
            //           OPEN NOW!
            //         </Typography>
            //       </CardContent>
            //       <CardActions disableSpacing>
            //         <IconButton aria-label="add to favorites">
            //           <FavoriteIcon />
            //         </IconButton>
            //         <IconButton aria-label="share">
            //           <ShareIcon />
            //         </IconButton>
            //         <ExpandMore
            //           expand={expanded}
            //           onClick={() => handleExpandClick(i)}
            //           aria-expanded={expandedId === i}
            //           aria-label="show more"
            //         >
            //           <ExpandMoreIcon />
            //         </ExpandMore>
            //       </CardActions>
            //       <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
            //         <Grid 
            //         container 
            //         direction="row"
            //         justifyContent="space-around"
            //         alignItems="flex-start"
            //         textAlign="left"
            //         rowSpacing={1} 
            //         columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            //           <Typography item paragraph>
            //             <item>
            //             Address: 
            //             <li style={{listStyleType:"none"}}>{place.address}</li>
            //             <li style={{listStyleType:"none"}}>{place.city}, {place.state}</li>
            //             <li style={{listStyleType:"none"}}>{place.zip}</li>
            //             </item>
            //           </Typography>
            //           <Typography item paragraph>
            //           <item>
            //             Open:
            //             {place.openDays.map((day) => 
            //               {return (
            //                 <li>{day} from {place.openingHour}am to {place.closingHour-12}pm</li>
            //               )}
            //             )}
            //             </item>
                        
            //           </Typography>
            //         </Grid>
            //       </Collapse>
            //     </Card>
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