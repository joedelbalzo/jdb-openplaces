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
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//component imports

//store imports
import { fetchPlaces } from '../store';


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
  const { places } = useSelector(state => state);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  useEffect(()=> {
    dispatch(fetchPlaces());
  }, []);

  const placeCategories = () => {
    const categories = []
    for(let place of places){
      if (!categories.includes(place.category)){
        categories.push(place.category.toLowerCase())
      }
    }
    return categories.sort()
  }
  const categories = placeCategories()

  // form "umbrella categories, would probably have to sort within the placeCategories function first, like if umbrellaCategory.includes(category){push to umbrella category"

  return (   
    <>
    <div> 
    {categories.map( category => { return (
      <div>
        <div>
         {category}
        </div>
        <div>
          {places.map( place => { return (
            <Card sx={{ width: 350 }}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                      </IconButton>
                    }
                    title={place.name}
                  />
                  <CardMedia
                    component="image"
                    //an image would go here
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {place.description}
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
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                      </Typography>
                      
                    </CardContent>
                  </Collapse>
                </Card>
                )
              }
            )
          }
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