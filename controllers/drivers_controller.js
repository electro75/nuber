const Driver = require('../models/driver');

module.exports = {

    sample(req, res) {
        res.send({sup: 'bro'})
    },

    create(req, res) {
        console.log(req.body);
        res.send({sup: 'bro'})
    }
}