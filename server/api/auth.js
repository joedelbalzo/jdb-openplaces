const express = require('express');
const app = express.Router();
const { User } = require('../db');
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
    console.log('ok youre in the wrong call')

    res.send(req.user); 
  }
  catch(ex){
    next(ex);
  }
});
app.get('/favorites', isLoggedIn, async(req, res, next)=> {
  try {
    console.log('ok you made it to api favorites')
    const favorites = await req.user.getFavorites()
    console.log('favorites', favorites)
    res.send(favorites)
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


