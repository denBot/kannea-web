const isAuthenticated = function (req, res, next) {
  if (req.session && req.session.adminUser) {
    next()
  } else {
    res.send(403, "User is unauthenticated or lacking permissions.")
  }
}

const isAuthenticatedAndAdmin = function (req, res, next) {
  if (
    req.session &&
    req.session.adminUser &&
    req.session.adminUser.role === "admine"
  ) {
    next()
  } else {
    res.send(403, "User is unauthenticated or lacking permissions.")
  }
}

module.exports = { isAuthenticated, isAuthenticatedAndAdmin }
