// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
}

module.exports = isAuthenticated;
// Apply the middleware to the profile-page route

