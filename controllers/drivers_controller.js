const Driver = require('../models/driver');

module.exports = {

    sample(req, res) {
        res.send({sup: 'bro'})
    },

    // index(req, res, next) {
    //     const { lng, lat } = req.query;

    //     Driver.geoNear(
    //         { type: 'Point', coordinates: [lng, lat] },
    //         { spherical: true, maxDistance: 20000 }
    //     )
    //     .then(drivers => {
    //         res.send(drivers)
    //     })
    //     .catch(next);
    // },

    index(req, res, next) {
        const { lng, lat } = req.query;
        const point = {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
        };
        Driver.aggregate([
            {
                $geoNear: { 
                    near: point,
                    spherical: true,
                    maxDistance: 200000,
                    distanceField: 'dist.calculated'
                }
            }])
            .then((drivers) => {
                res.send(drivers);
            })
            .catch(next);

    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then((driver)=> res.send(driver))
            .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({_id: driverId}, driverProps)
            .then(() => {
                Driver.findById({_id: driverId})
            })
            .then(driver => res.send(driver))
            .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;
        
        Driver.findByIdAndRemove({_id: driverId})
            .then(driver => {
                res.status(200).send(driver)
                    
            })
            .catch(next);
    }
}