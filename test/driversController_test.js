const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('Drivers Controller', ()=>{
    it('Post request /api/drivers creates a new driver', (done)=>{
        Driver.count().then((count)=>{
            request(app)
            .post('/api/drivers')
            .send({ email: 'test@test.com'})
            .end(()=>{
                Driver.count().then(newCount =>{
                    assert(count + 1 === newCount);
                    done();
                })
            })
        })
            
    })

    it('Put request /api/drivers/:id edits a driver with the id', (done)=>{
        const driver = new Driver({email: 'testDriver@g.com', driving: false});

        driver.save()
            .then(()=>{
                request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: true })
                .end(()=>{
                    Driver.findOne({email: 'testDriver@g.com'})
                        .then(driver =>{
                            assert(driver.driving === true);
                            done();
                        })
                })
                
            })
    })

    it('Delete request /api/drivers/:id deletes the driver with the given id', (done)=>{
        const driver = new Driver({ email:'deleteDriver@t.com' });

        driver.save()
            .then(()=>{
                Driver.count().then((count)=>{
                    request(app)
                    .delete(`/api/drivers/${driver._id}`)
                    .end(()=>{
                        Driver.count().then(newCount =>{
                            assert(count - 1 === newCount);
                            done();
                        })
                    })
                })
                
            })
    })
})