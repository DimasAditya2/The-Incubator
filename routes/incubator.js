const Controller = require("../controllers/controller")
const router = require('express').Router()
router.get("/", Controller.landingPage)
router.get("/add", Controller.renderAdd)
router.post("/add", Controller.handlerAdd)

router.get("/:incubatorId/startUp/add", Controller.addStartUp)
router.post("/:incubatorId/startUp/add", Controller.handlerAddStartUp)

module.exports = router