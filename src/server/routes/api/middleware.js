const auth = (req) => req.session && req.session.adminUser

const isAuthenticated = function (req, res, next) {
  if (auth(req)) {
    next()
  } else {
    res.send(403, "User is unauthenticated.")
  }
}

const isAuthenticatedAndAdmin = function (req, res, next) {
  if (auth(req) && req.session.adminUser.role === "admin") {
    next()
  } else {
    res.send(403, "User is unauthenticated or lacking permissions.")
  }
}

module.exports = { isAuthenticated, isAuthenticatedAndAdmin }
