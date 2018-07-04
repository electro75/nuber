const Driver = require('../models/driver');

module.exports = {

    sample(req, res) {
        res.send({sup: 'bro'})
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then((driver)=> res.send(driver))
            .catch(next);
    }
}