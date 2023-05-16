const express = require('express');
const app = express.Router();
const { User, Place } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/register', async(req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, (req, res, next)=> {
  try {
    // console.log('ok youre in the GET call')
    res.send(req.user); 
  }
  catch(ex){
    next(ex);
  }
});
app.get('/favorites', isLoggedIn, async(req, res, next)=> {
  try {
    // console.log('api GET favorites call!!!')
    const favorites = await req.user.getFavorites()
    // console.log('favorites', favorites)
    res.send(favorites)
  }
  catch(ex){
    next(ex);
  }
});
app.put(`/favorites/add`, isLoggedIn, async(req, res, next)=> {
  try {
    const {place} = req.body
    const user = req.user
    const favorite = await user.addFavorite(place.id)
    // console.log('favorites',favorite)

    res.send(favorite)
  }
  catch(ex){
    next(ex);
  }
});
app.delete(`/favorites/remove/:id`, isLoggedIn, async(req, res, next)=> {
  try {
    // console.log('ok you made it to api removing favorites')
    const user = req.user
    const placeToRemove = await Place.findByPk(req.params.id)
    const removeFavorite = await user.removeFavorite(placeToRemove)
    res.status(200).send({ message: 'favorite removed' });
  }
  catch(ex){
    next(ex);
  }
});



app.put('/', isLoggedIn, async(req, res, next)=> {
  try {
    // https://opencagedata.com/tutorials/geocode-in-javascript do this!
    const user = req.user;
    await user.update(req.body);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});


