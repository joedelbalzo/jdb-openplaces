const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, ARRAY } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DECIMAL } = require('sequelize');
const JWT = process.env.JWT || "shhhhhh1234";


const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false
  },
  settingRadius:{
    type: INTEGER,
    allowNull: false,
    defaultValue: 500,
     validate :{
        min: 100
     }
  },
  settingRadius:{
    type: INTEGER,
    allowNull: false,
    defaultValue: 500,
     validate :{
        min: 100,
        max: 5000
     }
  },
  settingFavCategories:{
    type: ARRAY ( STRING ),
    allowNull: false,
    defaultValue: ['cafe'],
  },
  settingHomeLat:{
    type: DECIMAL,
    allowNull: true,
    defaultValue: 38.8982,
  },
  settingHomeLng:{
    type: DECIMAL,
    allowNull: true,
    defaultValue: -77.0209,
  },

});

User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function(token){
  try {
    const { id } = jwt.verify(token, JWT);
    const user = await this.findByPk(id);
    if(user){
      return user;
    }
    throw 'user not found';
  }
  catch(ex){
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

User.prototype.generateToken = function(){
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function({ username, password }){
  const user = await this.findOne({
    where: {
      username
    }
  });
  if(user && await bcrypt.compare(password, user.password)){
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
}

module.exports = User;

