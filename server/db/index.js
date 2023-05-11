const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const fakeData = require('./fakeData')

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl, admin] = await Promise.all([
    User.create({ 
      username: 'moe', 
      password: '123',
      settingRadius: 500,
      settingFavCategories: ['cafe'], 
      settingHomeLat: 40.776230,
      settingHomeLng: -73.910634
    }),
    User.create({ 
      username: 'lucy', 
      password: '123',
      settingRadius: 1000,
      settingFavCategories: ['school'],
      settingHomeLat: 38.538460,
      settingHomeLng: -75.061661
     }),
    User.create({ 
      username: 'larry', 
      password: '123',
      settingRadius: 200,
      settingFavCategories: ['restaurant', 'museum'],
     }),
    User.create({ 
      username: 'ethyl', 
      password: '123',
      settingRadius: 2000,
      settingFavCategories: ['gym', 'store', 'supermarket'],
      settingHomeLat: 40.768044, 
      settingHomeLng: -73.982372
     }),
    User.create({ 
      username: 'admin', 
      password: '123',
      isAdmin: true,
      settingRadius: 200,
      settingFavCategories: [],
    }),

  ]);

  const [tastys, trattoria, taverna, marthas, sandros, starbucks, library, burgerClub, theCafeHouse, cafeMocha, coffeeShop, italianKitchen, pizzaPalace, scienceMuseum, naturalHistory, playzone, dailyGrind, pizzaParadise, centralPark, gymNation, sunriseCafe, luxeSalon, cityMuseum, tacoTaco, theHairSalon, glossyLocks, strikeZone] = await Promise.all(fakeData.map(async(place) => {await Place.create({
      name: place.name,
      opening_hours: place.opening_hours,
      formatted_address: place.formatted_address,
      weekday_text: place.weekday_text,
      photo: place.photo,
      rating: place.rating,
      types: place.types,
      url: place.url,
      geometry: place.geometry
    })}))
  return {
    users: {
      moe,
      lucy,
      larry, 
      ethyl,
      admin
    },
    places: {
      tastys, trattoria, taverna, marthas, sandros, starbucks, library,burgerClub, theCafeHouse, cafeMocha, coffeeShop, italianKitchen, pizzaPalace, scienceMuseum, naturalHistory, playzone, dailyGrind, pizzaParadise, centralPark, gymNation, sunriseCafe, luxeSalon, cityMuseum, tacoTaco, theHairSalon, glossyLocks, strikeZone
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Place
};
