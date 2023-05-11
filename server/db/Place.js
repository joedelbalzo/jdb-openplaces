const conn = require('./conn');
const { STRING, UUID, UUIDV4, BOOLEAN, ARRAY, JSON, DECIMAL, TEXT, OBJECT } = conn.Sequelize;

const Place = conn.define('place', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  },
  formatted_address: {
   type: STRING
  },
  opening_hours: {
    type: JSON
  },
  weekday_text: {
    type: ARRAY (STRING)
  },
  photo: {
    type: STRING
  },
  rating: {
    type: DECIMAL
  },
  types: {
    type: ARRAY(STRING)
  },
  url: {
    type: STRING
  },
  geometry: {
    type: JSON
  }
//   category: {
//     type: STRING,
//  },
//   address: {
//     type: STRING,
//  },
//   city: {
//     type: STRING,
//  },
//   state: {
//     type: STRING,
//  },
//   zip: {
//     type: INTEGER
//   },
//   openDays:{
//     type: ARRAY( STRING ),
//     defaultValue: ['Temporarily Closed']
//   },
//   openingHour: {
//     type: INTEGER,  
//     defaultValue: 0
//   },
//   closingHour: {
//     type: INTEGER,  
//     defaultValue: 0
//   },
//   googRating: {
//     type: DECIMAL(10, 1),
//     defaultValue: 0,
//     validate: {
//       min: 0,
//       max: 5
//     }
//   },
//   yourRating: {
//     type: INTEGER,
//     defaultValue: 0,
//     validate: {
//       min: 0,
//       max: 10
//     }
//   },
//   favorite: {
//     type: BOOLEAN,
//     defaultValue: false,
//   },
//   notes: {
//     type: TEXT,
//     defaultValue: "no notes",
//   }



});

module.exports = Place;

