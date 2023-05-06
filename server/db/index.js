const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl, admin] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
    User.create({ username: 'admin', password: '123', isAdmin: true }),

  ]);

  const [kinship, queensRoom, dough, steinwayLibrary] = await Promise.all([
    Place.create({ 
      name: 'Kinship', 
      category: 'cafe', 
      address: '23-92 21st St.', 
      city: 'Queens', 
      state: 'NY', 
      zip: 11105,
      openDays: ['Sun','M','T','W','Th','F','Sat'],
      openingHour: 7, 
      closingHour: 18, 
      googRating: 4.3,
      yourRating: 9, 
      favorite: true, 
      notes: 'weird seating choices'
    }),
    Place.create({ 
      name: 'Queens Room', 
      category: 'restaurant', 
      address: '36-02 Ditmars Blvd.', 
      city: 'Queens', 
      state: 'NY', 
      zip: 11105,
      openDays: ['Sun','M','T','W','Th','F','Sat'],
      openingHour: 9, 
      closingHour: 1, 
      googRating: 4.5,
      yourRating: 7, 
      favorite: true, 
      notes: 'coffee is hit or miss'
    }),
    Place.create({ 
      name: 'Dough', 
      category: 'cafe', 
      address: '21-70 31st St.', 
      city: 'Queens', 
      state: 'NY', 
      zip: 11105,
      openDays: ['Sun','M','T','W','Th','F','Sat'],
      openingHour: 9, 
      closingHour: 19, 
      googRating: 4,
      yourRating: 7, 
      favorite: true, 
      notes: 'coffee is bad, no inside seating'
    }),
    Place.create({ 
      name: 'Steinway Library', 
      category: 'library', 
      address: '21-70 31st St.', 
      city: 'Queens', 
      state: 'NY', 
      zip: 11105,
      openDays: [],
      openingHour: 10, 
      closingHour: 18, 
      googRating: 3.8,
      yourRating: 6, 
      favorite: true, 
      notes: 'great childrens floor'
    }),
  ]);

  return {
    users: {
      moe,
      lucy,
      larry, 
      ethyl,
      admin
    },
    places: {
      kinship,
      queensRoom,
      dough, 
      steinwayLibrary
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Place
};
