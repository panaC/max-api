import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SALT_NUMBER } from '../constants';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hccode: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
});

// Here arrow fct doesn't work, why ?
UserSchema.pre('save', function(next) {
  const user: any = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.hash(user.password, SALT_NUMBER, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
  } else {
    return next();
  }
});
