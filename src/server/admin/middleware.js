const isAuthenticated = function (req, res, next) {
  if (req.session && req.session.adminUser) {
    next()
  } else {
    res.json({
      code: 403,
      message: "User is unauthenticated or lacking permissions.",
    })
  }
}

const isAuthenticatedAndAdmin = function (req, res, next) {
  if (
    req.session &&
    req.session.adminUser &&
    req.session.adminUser.role === "admin"
  ) {
    next()
  } else {
    res.json({
      code: 403,
      message: "User is unauthenticated or lacking permissions.",
    })
  }
}

module.exports = { isAuthenticated, isAuthenticatedAndAdmin }
