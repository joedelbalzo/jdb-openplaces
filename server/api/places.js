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
  // try{
  //   res.send(await Place.findAll())
  // }
  // catch(err){
  //   next(err)
  // }

  const { lat, lng, radius, type } = req.query;
  console.log(lat, lng, radius, type)
  console.log(type)
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&type=${type}&key=${apiKey}&opennow=true`

  try {
    const response = await axios.get(url);
    console.log(response.data.results, 'response')
    res.send(response.data.results)
  }
   catch(err){
    console.log(err)
  }

  //   const places = response.data.results.filter(place => {
  //     // Filter out places with less than 50 user reviews or a rating lower than 2 out of 5
  //     return place.user_ratings_total >= minReviews && place.rating >= minRating;
  //   });
  //   const placesDetails = await Promise.all(places.map(async (place, idx) => {
  //     if(idx>0){return}
  //     const placeDetails = await fetchPlaceDetails(place.place_id, apiKey);
  //     return {
  //       name: place.name,
  //       address: place.formatted_address,
  //       rating: place.rating,
  //       photo: placeDetails.photo,
  //       opening_hours: {
  //         weekday_text: placeDetails.opening_hours.weekday_text,
  //         periods: placeDetails.opening_hours.periods
  //       },
  //      types: placeDetails.types,
  //      url: placeDetails.url

  //     };
  //   }));
  //   console.log(places)
  //   res.send(placesDetails)
  // } catch (error) {
  //   console.error(error);
  // }

  // async function fetchPlaceDetails(placeId, apiKey) {
  //   const fields = 'photo,opening_hours, types';
  //   const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
  //   try {
  //     const response = await axios.get(url);
  //     // undefined here
  //     console.log(response.data)
  //     const result = response.data.result;
  //     console.log(result)
  //     const photo = result.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${apiKey}` : '';
  //     const opening_hours = result.opening_hours ? result.opening_hours : [];
  //      const types = result.types ? result.types : [];
  //     return { photo, opening_hours };

  }
);

module.exports = app