const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const router = express.Router();
const { loginValidator, signupValidator } = require("../validation");
const user = require("../models/User");
const passport = require("passport");

//@route GET user/
//@desc get basic user information/settings
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findById(req.user.id)
      .then((foundUser) => {
        res.json({
          email: foundUser.email,
          username: foundUser.username,
          darkModeEnabled: foundUser.darkModeEnabled,
          listViewEnabled: foundUser.listViewEnabled,
          profilePicture: foundUser.profilePicture,
        });
      })
      .catch(() => res.status(404).json({ userGetError: "User not found" }));
  }
);

//@route POST user/signup
//@desc register user
//@access Private
router.post("/signup", (req, res) => {
  const { errors, isValid } = signupValidator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  req.body.email = req.body.email.trim().toLowerCase();
  user
    .findOne({ email: req.body.email })
    .then((foundUser) => {
      if (foundUser) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          if (req.body.profilePicture) {
            newUser.profilePicture = req.body.profilePicture;
          }
          newUser
            .save()
            .then(() => {
              res.json({ success: true });
            })
            .catch(() =>
              res.status(500).json({ signupError: "Something went wrong" })
            );
        });
      });
    })
    .catch(() => res.status(500).json({ signupError: "Something went wrong" }));
});

//@route POST user/login
//@desc login user
//@access Private
router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidator(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const password = req.body.password;
  const email = req.body.email.trim().toLowerCase();
  user
    .findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        throw err;
      }
      bcrypt.compare(password, foundUser.password).then((isEqual) => {
        if (isEqual) {
          const payload = {
            id: foundUser.id,
            username: foundUser.username,
          };
          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 86400 },
            (err, token) => {
              res.json({
                token: `Bearer ${token}`,
              });
            }
          );
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(() => {
      errors.email = "Email not found";
      res.status(404).json(errors);
    });
});

//@route PUT user/settings/view
//@desc change notes view type
//@access Private
router.put(
  "/settings/view",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findById(req.user.id)
      .then((foundUser) => {
        foundUser.listViewEnabled = !foundUser.listViewEnabled;
        foundUser
          .save()
          .then(() => res.json({ success: true }))
          .catch(() =>
            res.status(500).json({ settingUpdateError: "Something went wrong" })
          );
      })
      .catch(() =>
        res.status(404).json({ settingUpdateError: "User not found" })
      );
  }
);

//@route PUT user/settings/mode
//@desc change display mode type
//@access Private
router.put(
  "/settings/mode",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findById(req.user.id)
      .then((foundUser) => {
        foundUser.darkModeEnabled = !foundUser.darkModeEnabled;
        foundUser
          .save()
          .then(() => res.json({ success: true }))
          .catch(() =>
            res.status(500).json({ settingUpdateError: "Something went wrong" })
          );
      })
      .catch(() =>
        res.status(404).json({ settingUpdateError: "User not found" })
      );
  }
);

//@route DELETE user/
//@desc delete user account
//@access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    user
      .findByIdAndDelete(req.user.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch(() =>
        res.status(404).json({ accountDeleteError: "User not found" })
      );
  }
);

module.exports = router;
