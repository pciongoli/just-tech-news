// authgaurd route to restrict it to authenticated users only
// function will act as a normal request callback function, checking for
// the existence of a session property and using res.direct() if its not there
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.direct('/ogin');
  } else {
    next();
  }
};

module.exports = withAuth;

// this will get imported in dashboard-routes.js
