const Controller = require("../controllers/controller")
const router = require('express').Router()
const incubatorRoute = require('./incubator')
const startUpRoute = require('./startup')

router.get("/", Controller.landingPage)
router.use("/incubators", incubatorRoute)
    
router.use("/startUp", startUpRoute)

module.exports = router
 