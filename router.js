// XXX Maybe split route handlers into separate modules?
// Could do some kind of fs.readdir and then require them all.

var routes = require("routes")
, Router = routes.Router
, Route = routes.Route
, filed = require("filed")
, router = new Router()
, errors = require("./errors.js")
, config = require("./config.js")


module.exports = router

// static stuff serves out of the static folder.
var static = require("./routes/static.js")
router.addRoute("/-/static/*", static)
router.addRoute("/-/static", static)
router.addRoute("/favicon.ico", static)

router.addRoute("/-/login", require("./routes/login.js"))
router.addRoute("/-/profile", require("./routes/profile.js"))
router.addRoute("/-/logout", require("./routes/logout.js"))


// any other /-/special routes should 404
router.addRoute("/-/*", errors(404))
router.addRoute("/-", errors(404))

// The package details page
// Definitely ought to be its own module.
var packagePage = require("./routes/package-page.js")
router.addRoute("/:name/:version", packagePage)
router.addRoute("/:name", packagePage)