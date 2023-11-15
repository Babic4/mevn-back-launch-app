const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const shemUser = new Schema({
  name: String,
  email: String,
  password: String,
  image: {
    type: String,
    default: "public/img/default-user-image.png",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  biography: String,
  webSites: [
    {
      type: String,
    },
  ],
  isAdmin: Boolean,
});

shemUser.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

shemUser.pre("findOneAndUpdate", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user._update.password) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user._update.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user._update.password = hash;
      next();
    });
  });
});

module.exports = model("User", shemUser);
