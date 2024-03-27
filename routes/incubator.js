const Controller = require("../controllers/controller")
const router = require('express').Router()
router.get("/", Controller.landingPage)
router.get("/add", Controller.renderAdd)
router.post("/add", Controller.handlerAdd)

router.get("/:incubatorId/startUp/add", Controller.addStartUp)
router.post("/:incubatorId/startUp/add", Controller.handlerAddStartUp)
router.get("/:incubatorId/startUp/:startUpId/edit", Controller.renderEdit)
router.post("/:incubatorId/startUp/:startUpId/edit", Controller.handlerEdit)
router.get("/:incubatorId/startUp/:startUpId/delete", Controller.deleteStartUp)
router.get("/:incubatorId", Controller.detail)

module.exports = router