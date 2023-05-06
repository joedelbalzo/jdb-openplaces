const conn = require('./conn');
const { STRING, UUID, UUIDV4, BOOLEAN, ARRAY, INTEGER, DECIMAL, TEXT } = conn.Sequelize;

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
  category: {
    type: STRING,
    allowNull: false
  },
  address: {
    type: STRING,
    allowNull: false
  },
  city: {
    type: STRING,
    allowNull: false
  },
  state: {
    type: STRING,
    allowNull: false
  },
  zip: {
    type: INTEGER
  },
  openDays:{
    type: ARRAY( STRING ),
  },
  openingHour: {
    type: INTEGER,  
    allowNull: false,
    defaultValue: 0
  },
  closingHour: {
    type: INTEGER,  
    allowNull: false,
    defaultValue: 0
  },
  googRating: {
    type: DECIMAL(10, 1),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  yourRating: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  },
  favorite: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  notes: {
    type: TEXT,
    allowNull: false,
    defaultValue: "no notes",
  }


});

module.exports = Place;

