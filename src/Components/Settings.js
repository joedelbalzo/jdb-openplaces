import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { editUserSettings } from '../store';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

const Settings = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const [settingFavCategories, setSettingFavCategories] = useState([]);

  if (!auth) {
    return 'wtf';
  }

  const DEFAULT_FORM_INPUTS = {
    username: '',
    settingRadius: '',
    settingHomeLat: '',
    settingHomeLng: '',
  };
  
  const [formInputs, setFormInputs] = useState(DEFAULT_FORM_INPUTS);

  useEffect(() => {
    if (auth) {
      setFormInputs({
        username: auth.username || '',
        settingRadius: auth.settingRadius || '',
        settingHomeLat: auth.settingHomeLat || '',
        settingHomeLng: auth.settingHomeLng || '',
      });
      setSettingFavCategories(auth.settingFavCategories || '');
    }
  }, [auth]);

  console.log(auth)
  console.log(formInputs)

  const useStyles = makeStyles({
    formControlLabel: {
      marginBottom: '10px',
    },
  });
  const classes = useStyles();

  const handleChange = event => {
    const idx = formattedTypes.indexOf(event.target.name);
    const category = googleTypes[idx];
    if (event.target.checked && settingFavCategories.length < 5) {
      setSettingFavCategories([...settingFavCategories, category]);
    } else {
      setSettingFavCategories(
        settingFavCategories.filter(c => c !== category)
      );
    }
  };

  const googleTypes = [ "amusement_park", "aquarium", "art_gallery", "atm",
  // "amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "cafe","car_wash", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "department_store", "doctor", "drugstore", "electronics_store",
  // "florist", "furniture_store", "gas_station", "gym", "hair_care", "hardware_store", "home_goods_store", "hospital", "laundry", "lawyer", "library", "liquor_store", "lodging", "meal_delivery", "meal_takeaway", "mosque", "movie_theater", "museum", "park", "parking", "pet_store", "pharmacy", "primary_school", "restaurant", "school", "shoe_store", "shopping_mall", "spa", "stadium", "store", "supermarket", "tourist_attraction", "university", "zoo"
];

  const formattedTypes = ["Amusement Parks", "Aquariums", "Art Galleries", "ATMs",
    // "Amusement Parks", "Aquariums", "Art Galleries", "ATMs", "Bakeries", "Banks", "Bars", "Beauty Salons", "Bicycle Stores", "Book Stores", "Bowling Alleys", "Cafes","Car Washes", "Churches", "City Halls", "Clothing Stores", "Convenience Stores", "Courthouses", "Department Stores", "Doctors", "Drugstores", "Electronics stores", "Florists", "Furniture Stores", "Gas Stations", "Gyms", "Hair Care", "Hardware Stores", "Home Goods Stores", "Hospitals", "Laundromats", "Lawyers", "Libraries", "Liquor Stores", "Lodgings", "Meal deliveries", "Meal Takeaway", "Mosques", "Movie Theaters", "Museums", "Parks", "Parkings", "Pet Stores", "Pharmacies", "Primary schools", "Restaurants", "Schools", "Shoe Stores", "Shopping Malls", "Spas", "Stadiums", "Stores", "Supermarkets", "Tourist Attractions", "Universities", "Zoos"
];
  
  const onSubmit = (auth) => {
    // console.log(ev)
    // ev.preventDefault();
    console.log(auth, formInputs, settingFavCategories)
    // dispatch(editUserSettings({auth, formInputs, settingFavCategories}))
    setFormInputs(DEFAULT_FORM_INPUTS);
  };
  
  const onChange = (ev) => {
    console.log('onChange')
    console.log('ev', ev)
    const name = ev.target.input;
    const value = ev.target.value;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  

  return (
    <div id= 'settingsPage'>
          <Box
            component="form"
            sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
            noValidate
            autoComplete="off">
         {Object.keys(formInputs).map(input => {return(
           <>
           {console.log(input)}
           {input !== settingFavCategories ? 
              (<TextField
              key={input}
              id="outlined-controlled"
              label={input}
              value={formInputs[input]}
              onChange={ev => onChange(ev)}
              
              />)
              :
              (
                <FormGroup>
                <FormLabel>Choose up to 5 categories:</FormLabel>
                {formattedTypes.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={settingFavCategories.includes(category)}
                        onChange={handleChange}
                        name={category}
                      />
                    }
                    label={category}
                    className={classes.formControlLabel}
                  />
                ))}
              </FormGroup>
              )
            }
            </>
           )}
         )
        }
          <Button onClick={() => onSubmit(auth)}>Submit</Button>
        </Box>
    </div>
  );
};

export default Settings;
