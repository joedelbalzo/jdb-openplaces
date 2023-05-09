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
      settingFavCategories: ['cafe', 'restaurant', 'museum', 'library', 'bakery', 'stadium'], 
      settingHomeLat: 40.776230,
      settingHomeLng: -73.910634
    }),
    User.create({ 
      username: 'lucy', 
      password: '123',
      settingRadius: 1000,
      settingFavCategories: ['cafe', 'restaurant', 'school', 'library', 'bakery', 'bowling_alley'],
      settingHomeLat: 38.538460,
      settingHomeLng: -75.061661
     }),
    User.create({ 
      username: 'larry', 
      password: '123',
      settingRadius: 200,
      settingFavCategories: ['cafe', 'restaurant', 'museum', 'library', 'bakery'],
     }),
    User.create({ 
      username: 'ethyl', 
      password: '123',
      settingRadius: 2000,
      settingFavCategories: ['cafe', 'restaurant', 'museum', 'library', 'bakery', 'church', 'gym', 'pharmacy', 'store', 'supermarket', 'laundry', 'lawyer'],
      settingHomeLat: 40.768044, 
      settingHomeLng: -73.982372
     }),
    User.create({ 
      username: 'admin', 
      password: '123',
      isAdmin: true,
      settingRadius: 200,
      settingFavCategories: ['cafe', 'restaurant', 'museum', 'library', 'bakery'],
    }),

  ]);

  const [tastys, trattoria, taverna, marthas, sandros, starbucks, library] = await Promise.all(fakeData.map(async(place) => {await Place.create({
      name: place.name,
      opening_hours: place.opening_hours,
      weekday_text: place.weekday_text,
      photo: place.photo,
      rating: place.rating
    })}))
  //   Place.create({ 
  //     name: 'Kinship', 
  //     category: 'cafe', 
  //     address: '23-92 21st St.', 
  //     city: 'Queens', 
  //     state: 'NY', 
  //     zip: 11105,
  //     openDays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  //     openingHour: 7, 
  //     closingHour: 18, 
  //     googRating: 4.3,
  //     yourRating: 9, 
  //     favorite: true, 
  //     notes: 'weird seating choices'
  //   }),
  //   Place.create({ 
  //     name: 'Queens Room', 
  //     category: 'restaurant', 
  //     address: '36-02 Ditmars Blvd.', 
  //     city: 'Queens', 
  //     state: 'NY', 
  //     zip: 11105,
  //     openDays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  //     openingHour: 9, 
  //     closingHour: 1, 
  //     googRating: 4.5,
  //     yourRating: 7, 
  //     favorite: true, 
  //     notes: 'coffee is hit or miss'
  //   }),
  //   Place.create({ 
  //     name: 'Dough', 
  //     category: 'cafe', 
  //     address: '21-70 31st St.', 
  //     city: 'Queens', 
  //     state: 'NY', 
  //     zip: 11105,
  //     openDays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  //     openingHour: 9, 
  //     closingHour: 19, 
  //     googRating: 4,
  //     yourRating: 7, 
  //     favorite: true, 
  //     notes: 'coffee is bad, no inside seating'
  //   }),
  //   Place.create({ 
  //     name: 'Steinway Library', 
  //     category: 'library', 
  //     address: '21-70 31st St.', 
  //     city: 'Queens', 
  //     state: 'NY', 
  //     zip: 11105,
  //     openDays: [],
  //     openingHour: 10, 
  //     closingHour: 18, 
  //     googRating: 3.8,
  //     yourRating: 6, 
  //     favorite: true, 
  //     notes: 'great childrens floor'
  //   }),
  // ]);

  return {
    users: {
      moe,
      lucy,
      larry, 
      ethyl,
      admin
    },
    places: {
      tastys, trattoria, taverna, marthas, sandros, starbucks, library
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Place
};
