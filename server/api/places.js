const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const Place = require('../db/Place')
require('dotenv').config({path: 'env.js'})

const apiKey = process.env.API_KEY

//prefix is /api/places
app.get('/', async(req,res,next) =>{
  try{
    
    res.send(await Place.findAll())
  }
  catch(err){
    err
  }
})

app.get('/nearby', async(req, res, next) => {
  const { lat, lng, radius, type } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const places = response.data.results;
      // Fetch photos and opening hours for each place
      const placesDetails = await Promise.all(places.map(async (place) => {
        const placeDetails = await fetchPlaceDetails(place.place_id, apiKey);
        return {
          ...place,
          ...placeDetails
        };
      }));
      // console.log('PLACES DETAILS', placesDetails)
      res.send(placesDetails)
      

    async function fetchPlaceDetails(placeId, apiKey) {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json';
    const params = {
      place_id: placeId,
      fields: 'name,photo,opening_hours',
      key: apiKey
    };
    try {
      const response = await axios.get(url, { params });
      const result = response.data.result;
      const photos = result.photos ? result.photos.map(photo => ("https://maps.googleapis.com/maps/api/place/photo" +
                "?maxwidth=400" +
                "&photoreference=" + photo.photo_reference +
                `&key=${apiKey}`)) : [];
      const openingHours = result.opening_hours ? result.opening_hours : [];
      return {
        photos,
        openingHours
      };
    } catch (error) {
      console.error(error);
    }
  }
} catch (error) {
  console.error(error);
}
})
  




//   try {
//     const { lat, lng, radius, type } = req.query;
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;
//     const response = await axios.get(url);
//     const placePhoto = response.data.results.forEach(place => {
//         return "https://maps.googleapis.com/maps/api/place/photo" +
//           "?maxwidth=400" +
//           "&photoreference=" + place.photos[0].photo_reference +
//           `&key=${apiKey}`;
//       })
//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching nearby places');
//   }
// });

module.exports = app