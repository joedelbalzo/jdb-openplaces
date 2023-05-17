const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const Place = require("../db/Place");
const { isLoggedIn } = require("./middleware");

require("dotenv").config({ path: "env.js" });

const apiKey = process.env.API_KEY;

//prefix is /api/places
app.get("/", async (req, res, next) => {
  try {
    res.send(await Place.findAll());
  } catch (err) {
    err;
  }
});

app.get("/nearby", async (req, res, next) => {
  try {
    res.send(await Place.findAll());
  } catch (err) {
    next(err);
  }

  // const { lat, lng, radius, type } = req.query;
  // console.log(lat, lng, radius, type)
  // console.log(type)
  // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&type=${type}&key=${apiKey}&opennow=true&rankby=prominence`
  //   try {
  //     const response = await axios.get(url);
  //     console.log(response.data.results, 'response')
  //     res.send(response.data.results)
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
});

app.put("/nearby/:id", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    const { notes, rating } = req.body;
    console.log(notes, rating);
    const place = await Place.findByPk(req.params.id);
    await place.update({ notes, rating });
    res.send(place);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
