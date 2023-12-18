// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

const prisma = require("../prisma");

// Ruta de registro
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });
    res.redirect("/login-page");
  } catch (error) {
    console.log(error);
    res.redirect("/register-page");
  }
});

// Ruta de inicio de sesión
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile-page",
    failureRedirect: "/login-page",
    failureFlash: true,
  })
);

router.get("/login-page", (req, res) => {
  res.render("login");
});

router.get("/register-page", (req, res) => {
  res.render("register");
});

router.get('/profile-page', (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Render the profile page and pass the user data to the template
    res.render('profile', { user: req.user });
  } else {
    // Redirect to the login page if the user is not authenticated
    res.redirect('/login-page');
  }
});



router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;