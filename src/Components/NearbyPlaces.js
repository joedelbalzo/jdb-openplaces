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
import { Button } from '@mui/material';
import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';


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
  const [currentCoords, setCurrentCoords]=useState(null)
  const [previousCoords, setPreviousCoords] = useState('');
  const [previousFetchTime, setPreviousFetchTime] = useState(0);  
  const [expanded, setExpanded] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(-1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryName, setCategoryName]=useState('')
  const [favorites, setFavorites]=useState([])

  
  useEffect(() => {
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
    
    
    
    {if(!nearbyPlaces){return null}}
    {if(!auth){
      navigate('../')
    }}
    
    const handleFavoriteClick = (ev) => {
      console.log(ev.target.value)
      if (favorites.includes(ev)) {
        setFavorites(favorites.filter((favorite) => favorite !== ev));
      } else {
        setFavorites([...favorites, ev]);
      }
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
    console.log('dispatched', lat, lng, radius, type)
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

  const photo = (category) =>{
    let picture;
    
    const cat = category ? category[0] : ''
    const idx = Math.floor(Math.random()*5)
    if (cat === ''){
      picture = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png'
      return picture
    }
    if(cat === "cafe" || cat === "bakery"){
      const cafePics = ['https://i.pinimg.com/564x/c2/b1/10/c2b11066a5f05bcd7eb0e5898b947312.jpg','https://cdn.sanity.io/images/38f3s2bw/production/66e9a7a44dce61e3da7ff714fc9b36365e97b708-550x369.jpg', 'https://images.squarespace-cdn.com/content/v1/571da513c2ea511fcc0e4e6e/1497206384966-UGI2XAP8V5VK8WN0PFPI/mogador2017-39.jpg?format=1500w', 'https://www.sussex.ac.uk/wcm/assets/media/271/content/74901.950x631.jpg', 'https://www.nycgo.com/images/venues/34671/2016mar19_0i5a2325_screenres__medium.jpg' ]
      return picture = cafePics[idx]
    }
    if(cat === "park" || cat === "amusement_park" || cat === "tourist_attraction") {
      const parkPics = ['https://assets3.thrillist.com/v1/image/2681645/1200x600/scale;','https://www.centralpark.com/downloads/9960/download/Bow_Bridge.jpg?cb=fc7c35a4bba0ac653beaa2664e8850b0&w=640','https://media.timeout.com/images/100796327/750/422/image.jpg','https://blog.goway.com/globetrotting/wp-content/uploads/2018/08/Petrin-Hill-in-Prague-Czech-Republic-_56617015-768x576.jpg','https://media.architecturaldigest.com/photos/5b32660a8c7e812ffa8b12f2/master/w_1600%2Cc_limit/Beto%2520Carrero%2520World%25203.jpg', 'https://thumbor.bigedition.com/bali-one-of-the-best-travel-destinations/AhTnENL8Nc2XjUMaS99tmPWfgXE=/69x0:1184x836/480x360/filters:format(webp):quality(80)/granite-web-prod/c5/b4/c5b44ca4133d48f1bdf14e0f47f3cfc4.jpeg']
      return picture = parkPics[idx]
    }
    if(cat === "bowling_alley"){
      return picture = 'https://lakebowl.com/wp-content/uploads/2022/05/home-events.jpg'
    }
    if(cat === "restaurant" || cat === "bar" || cat === "meal_takeaway"){
      const barPics = ['https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2022/10/fea_restaurants-13-1200pxsocial-960x520.jpg','https://www.visitstockton.org/imager/s3_us-west-1_amazonaws_com/stockton-2019/images/old-site-images/market-tavern-ube.b.baby_ce2e658811e5f0e94260caee893a7c4c.jpg', 'https://imageio.forbes.com/specials-images/imageserve/64429fc7cb93f22e95ebd709/0x0.jpg?format=jpg', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/2/21/0/FN_italian-restaurants-nyc-locanda-verde_s6x4.jpg.rend.hgtvcom.616.411.suffix/1550771403200.jpeg', 'https://s3-media0.fl.yelpcdn.com/bphoto/6J2wU1IGbMIiPIe8VXXpeQ/1000s.jpg']
      return picture = barPics[idx]
    }
    if(cat === "book_store" || cat === "clothing_store" || cat === "convenience_store" || cat === "department_store" || cat === "hardware_store" || cat === "home_goods_store" || cat === "shoe_store" || cat === "shopping_mall" || cat === "store"){
      const storePics = ['https://corporate.target.com/_media/TargetCorp/news/2019/10/disney%20store%20at%20target%20launch/Disney-store-at-Target-10042019_ABV.jpg','https://www.eatthis.com/wp-content/uploads/sites/4/2020/07/aisle.jpg?quality=82&strip=1','https://hips.hearstapps.com/hmg-prod/images/east-fork-store-1584995309.jpg?crop=1.00xw:0.752xh;0,0.159xh&resize=1200:*','https://retaildesignblog.net/wp-content/uploads/2013/07/Old-Amsterdam-Cheese-store-by-studiomfd-Amsterdam-720x480.jpg','https://mindfuldesignconsulting.com/wp-content/uploads/2012/05/Unique-Candy-Store-Designed-with-Penciled-in-Details-720x321.jpg']
      return picture = storePics[idx]
    }
    if(cat === "doctor" || cat === "drugstore" || cat === "hospital" ){
      const docPics = ['https://www.onemedical.com/media/images/nyc-408w14th-large.original.jpg','https://assets.contenthub.wolterskluwer.com/api/public/content/cf8bfabf74d04839911ef2e8fc6beed0?v=b7902933','https://assets.healthpartners.com/is/image/healthpartners/brand-identity/photography/facility/hospital/regions/web/dji-0021-edit-2000x888.jpg?wid=768','https://assets.healthpartners.com/is/image/healthpartners/brand-identity/photography/facility/hospital/regions/web/dji-0021-edit-2000x888.jpg?wid=768','https://www.usnews.com/object/image/0000015d-80a3-d768-a55f-f4afc8610000/170726-doctors-stock.jpg?update-time=1560788270906&size=responsive640']
      return picture = docPics[idx]
    }
    if(cat === "bank" ){
      const bankPics = ['https://s.wsj.net/public/resources/images/ON-CL615_bearst_B1280_20180314112445.jpg','https://www.mercurynews.com/wp-content/uploads/2023/04/Fed_autopsy_on_SVB_details_grave_mismanagement1.jpg?w=525','https://ocdn.eu/images/pulscms/MGY7MDA_/445f775c27752137e844f0749cd1d416.jpg','https://www.upflip.com/wp-content/uploads/2021/02/bank-building.jpg', 'https://bostonglobe-prod.cdn.arcpublishing.com/resizer/0Yk5Xdgfeec5NwOdrd782wrV9MM=/960x0/cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/UGYZLDFW7VI2ZAK7IPJWLPRPFY.jpg']
      return picture = bankPics[idx]
    }
    if(cat === "gym" || cat === "hair_care" || cat === "spa" ){
      const selfCarePics = ['https://media.timeout.com/images/105928521/750/422/image.jpg','https://www.peninsula.com/-/media/images/new-york/02spawellness/b_fitnesscentre/fitness-center_p.jpg?mw=987&hash=68077D08ADF694B17FBA50AFD1EFC79E','https://www.rawcorporatehealth.com/wp-content/uploads/2015/12/Yacht-SHERAKHAN-Spa-and-Gym.jpg','https://www.myfashionlife.com/wp-content/uploads/2019/02/spa_fitness_centre.jpg','https://www.thespaandgym.com/images/gallery2/Manchester%20Spa%201.jpg?text=Spa&space;entrance']
      return picture = selfCarePics[idx]
    }
    if(cat === "library" || cat === "museum") {
      const museumPics = ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/61/95/89/the-met-fifth-avenue.jpg?w=500&h=-1&s=1','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/21/75/2c/new-york-public-library.jpg?w=1200&h=1200&s=1','https://media.timeout.com/images/105776068/image.jpg','https://images.squarespace-cdn.com/content/v1/5930688715d5dbaa8b348ff3/1573911898614-C3CH58LGER55TQ1OM52Z/Oxford+Union+Library.jpg?format=1000w','https://media.cntraveler.com/photos/5a7741d04332805bf105f668/16:9/w_2560,c_limit/Morgan-Library-and-Museum__2018_9.-East-Room-2.jpg']
      return picture = museumPics[idx]
    }
    return picture
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


  return (   
    <>
    <div> 
    <div id= 'welcomePage'>
      { capitalizeFirstLetter(auth.username || '') }, {openNow(categoryName).length} {openNow(categoryName).length === 1 ? `${categoryName.split('_').join(' ')} is` : `${pluralize(categoryName, 0).split('_').join(' ')} are`}  open now.<br/>
      {openSoon(30).length === 0 ? '': `${openSoon(30).length} more within 30 minutes.`}<br/>
      {closingSoon(120).length === 0 ? '' : `${closingSoon(120).length} will close within two hours.`}<br/>
    </div>

      {/* <p style={{padding: '1rem', color: 'red', fontSize: 18}}>please don't hit this 100 times. i get charged every hit.</p> */}
    <div id='categoryButtonContainer'>
    {auth.settingFavCategories?.map( category => { return (
        <Button 
          variant="outlined" 
          // size="large" 
          sx={{
            fontSize: '2rem',
            marginBottom: '1rem',
            backgroundColor: selectedCategory === category ? 'dodgerblue' : 'transparent',
            color: selectedCategory === category ? 'white' : 'black',
            "&:hover": {
              backgroundColor: selectedCategory === category ? 'dodgerblue' : '#f0f0f0'
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
            .map( (place, i) => { return ( 
              <div>
                {/* {place.name} */}
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
                  height="300"
                  image={photo(place.types)}
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
                    <IconButton aria-label="add to favorites"  onClick={(ev) => handleFavoriteClick(ev)}>
                      {favorites.includes(place) ? <Favorite /> : <FavoriteBorderOutlined />}
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