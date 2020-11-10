const passport = require('passport');

//user auth middleware
const userAuth = passport.authenticate("jwt", { session: false });

module.exports = userAuth;