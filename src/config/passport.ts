import passport from 'passport';
// way to use passport local for typescript
import * as passportLocal from 'passport-local';
const localStrategy = passportLocal.Strategy;

import User, { IUser } from '../models/User';

// configure local strategy for passport
passport.use(new localStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  const user = await User.findOne({email});
  if (!user) {
    // if user not found terminate process using done
    // check the passport library documentation
    return done(null, false, { message: 'User not found'});
  } else {
    const match = await user.comparePassword(password);
    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password'});
    }
  }
}));

// session config
passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
