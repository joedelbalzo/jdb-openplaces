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
  res.send(await Place.findAll())
//   const { lat, lng, radius, type } = req.query;
//   const fields = 'geometry, name,formatted_address,rating,photo,opening_hours, types'
//   const minReviews = 50;
//   const minRating = 2;
//   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&type=${fields}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     const places = response.data.results.filter(place => {
//       // Filter out places with less than 50 user reviews or a rating lower than 2 out of 5
//       return place.user_ratings_total >= minReviews && place.rating >= minRating;
//     });
//     // Fetch photos and opening hours for each place
//     const placesDetails = await Promise.all(places.map(async (place) => {
//       const placeDetails = await fetchPlaceDetails(place.place_id, apiKey);
//       return {
//         name: place.name,
//         address: place.formatted_address,
//         rating: place.rating,
//         photo: placeDetails.photo,
//         opening_hours: {
//           weekday_text: placeDetails.opening_hours.weekday_text,
//           periods: placeDetails.opening_hours.periods
//         },
//        types: placeDetails.types

//       };
//     }));
//     console.log(places)
//     res.send(placesDetails)
//   } catch (error) {
//     console.error(error);
//   }

//   async function fetchPlaceDetails(placeId, apiKey) {
//     const fields = 'photo,opening_hours, types';
//     const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
//     try {
//       const response = await axios.get(url);
//       const result = response.data.result;
//       const photo = result.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${apiKey}` : '';
//       const opening_hours = result.opening_hours ? result.opening_hours : [];
//        const types = result.types ? result.types : [];
//       return { photo, opening_hours };
//     } catch (error) {
//       console.error(error);
//     }
  // }
});

module.exports = app