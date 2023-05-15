const { User } = require('../db');

const isLoggedIn = async(req, res, next)=> {
  try {
    console.log('ok you made it to isLoggedIn')
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    console.log('middleware', req.user)
    next();
  }
  catch(ex){
    next(ex);
  }
};

module.exports = {
  isLoggedIn
};
