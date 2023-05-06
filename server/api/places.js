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
  try {
    const { lat, lng, radius, type } = req.query;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching nearby places');
  }
});

module.exports = app