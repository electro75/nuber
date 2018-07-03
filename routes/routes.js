const DriversConttoller = require('../controllers/drivers_controller');

module.exports = (app) =>{
    app.get('/api', DriversConttoller.sample);
}