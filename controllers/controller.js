const {Incubator, Startup} = require("../models/index")


class Controller {
    // ? langing page
    static async landingPage(req, res) {
        try {
            let data = await Incubator.findAll()
            res.render('index', {data})
        } catch (error) {
            res.send(error)
        }
    }   

    // ? add incubator
    static async renderAdd(req, res) {
        try {
            // let startup = await Incubator.findAll()
            res.render('addIncubator')
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerAdd(req, res) {
        try {
            
            const {name, location, level} = req.body
            // console.log(req.body)
            await Incubator.create({
                name,
                location,   
                level
            });
            res.redirect('/')
        } catch (error) {
            // console.log(error)
            // const {incubatorId} = req.params
            
            if (error.name === 'SequelizeValidationError') {
                let errors = error.errors.map(el => el.message)
                res.redirect(`/incubators/${incubatorId}/startUp/add?errors=` + errors)
            } else {
                res.send(error)
            }
        }

        res.send(error)
        
    }

    // ? add startup
    static async addStartUp(req, res) {
        try {
            const {errors} = req.query
            let {incubatorId} = req.params
            // console.log(incubatorId, "<---")
            let incubator = await Incubator.findByPk(incubatorId)
            // let startup = await Startup.findOne(incubatorId)
            res.render('addStartup', {incubator, errors})
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerAddStartUp(req, res) {
        try {
            // console.log(req.body)
            const {incubatorId} = req.params
            // let data = await Incubator.findByPk(incubatorId)
            const {name, founder, date, education, role, valuation} = req.body
            await Startup.create({
                startUpName: name,
                founderName: founder,
                dateFound: date,
                educationOfFounder: education,
                roleOfFounder: role,
                IncubatorId: incubatorId, 
                valuation
            });
            // console.log(incubatorId)
            res.redirect(`/incubators/${incubatorId}`)
        } catch (error) {
            // console.log(error.name);
            
            const {incubatorId} = req.params
            
            if (error.name === 'SequelizeValidationError') {
                let errors = error.errors.map(el => el.message)
                res.redirect(`/incubators/${incubatorId}/startUp/add?errors=` + errors)
            } else {
                res.send(error)
            }
        }
    }
}

module.exports = Controller