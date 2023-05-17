const conn = require("./conn");
const { STRING, UUID, UUIDV4, ARRAY, JSON, DECIMAL, TEXT, INTEGER } =
  conn.Sequelize;

const Place = conn.define("place", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  formatted_address: {
    type: STRING,
  },
  opening_hours: {
    type: JSON,
  },
  weekday_text: {
    type: ARRAY(STRING),
  },
  photo: {
    type: STRING,
  },
  rating: {
    type: DECIMAL,
  },
  types: {
    type: ARRAY(STRING),
  },
  url: {
    type: STRING,
  },
  geometry: {
    type: JSON,
  },
  user_ratings_total: {
    type: INTEGER,
  },
  notes: {
    type: STRING,
    allowNull: true,
    defaultValue: "No notes",
  },
  your_rating: {
    type: DECIMAL(10, 1),
    defaultValue: 0,
    allowNull: false,
  },
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
