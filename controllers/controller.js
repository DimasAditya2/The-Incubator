const {Incubator, Startup} = require("../models/index")
const formatter = require("../helper/formatCurrency")



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

    // ? show startup
    static async showStartUp(req, res) {
        try {
            let data;
            const {filter} = req.query
            data = await Startup.getStartUpByRoleOfFounder(filter)
            
            res.render('allStartup', {data, formatter})
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

    static async detail(req, res) {
        try {
            const {incubatorId} = req.params
            let incubator = await Incubator.findByPk(incubatorId, {
                include: [Startup]
            })
            // console.log(incubator)
            // console.log(incubator, "<--")
            res.render('detailIncubator', {incubator, formatter})
            
            // res.send(incubator)
        } catch (error) {
            res.send(error)
        }
    }
    
    static async renderEdit(req, res) {
        try {
            let {incubatorId, startUpId} = req.params
            let {errors} = req.query
            let incubator = await Incubator.findByPk(incubatorId)
            let startup = await Startup.findByPk(startUpId)
            // res.send(startup)
            res.render('editStartup', {incubator, startup, errors})
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerEdit(req, res) {
        try {
            const { incubatorId, startUpId } = req.params;
            const { name, founder, date, education, role, valuation } = req.body;
        
            await Startup.update({
                startUpName: name,
                founderName: founder,
                dateFound: date,
                educationOfFounder: education,
                roleOfFounder: role,
                IncubatorId: incubatorId, 
                valuation
            }, {
                where: { id: startUpId } 
            });
        
            res.redirect(`/incubators/${incubatorId}`);
        } catch (error) {
            // console.log(error.errors);
            // console.log(error);
            const { incubatorId, startUpId } = req.params;
        
            if (error.name === 'SequelizeValidationError') { 
                let errors = error.errors.map(el => el.message);
                // console.log(errors);
                
                res.redirect(`/incubators/${incubatorId}/startUp/${startUpId}/edit?errors=` + errors);
                // console.log('jalan bro');
                
            } else {
                res.send(error);
            }
        }
        
    }

    // ! delete
    static async deleteStartUp(req, res) {
        try {
            const {incubatorId, startUpId} = req.params

            await Startup.destroy({
                where: {
                    IncubatorId: incubatorId,
                    id: startUpId
                }
            })
            res.redirect(`/incubators/${incubatorId}`)
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = Controller