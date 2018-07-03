const express = require('express');

const app = express();

app.get('/api', (req, res)=>{
    res.send({sup: 'bro'});
});

module.exports = app;