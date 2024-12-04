const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/index')
const db = require('../src/dbClient')
const userController = require('../src/controllers/user')

chai.use(chaiHttp)

describe('User API', () => {

    beforeEach(() => {
        // Clean DB before each test
        db.flushdb()
      })
      
      after(() => {
        app.close()
        db.quit()
      })

    describe('POST /user', () => {

        it('should create a new user', (done) => {
          const user = {
            username: 'user1',
            firstname: 'Liza',
            lastname: 'Danilina',
            email: 'lizadan@example.com'
          }
          chai.request(app)
            .post('/user')
            .send(user)
            .then((res) => {
              chai.expect(res).to.have.status(201)
              chai.expect(res.body.status).to.equal('success')
              chai.expect(res).to.be.json
              done()
            })
            .catch((err) => {
                done(err)
            })
        })

        it('should return an error for missing fields', (done) => {
            const user = {
              username: 'user1'
            }
            chai.request(app)
              .post('/user')
              .send(user)
              .then((res) => {
                chai.expect(res).to.have.status(400)
                chai.expect(res.body.status).to.equal('error')
                chai.expect(res).to.be.json
                done()
              })
              .catch((err) => {
                 throw err
              })
          })
    });

    describe('GET /user', () => {
        it('should return all users', (done) => {
            const user1 = { 
                username: 'user1', 
                firstname: 'Liza', 
                lastname: 'Danilina', 
                email: 'lizadan@example.com' 
            };
    
            const user2 = { 
                username: 'user2', 
                firstname: 'Liz', 
                lastname: 'Dan', 
                email: 'liz@example.com' 
            };
            
            userController.createUser(user1, () => {
                userController.createUser(user2, () => {
                    chai.request(app)
                        .get('/user')
                        .then((res) => {
                            chai.expect(res).to.have.status(200);
                            chai.expect(res.body.status).to.equal('success');
                            done();
                        })
                        .catch((err) => {
                            done(err);
                        });
                });
            });
        });

        it('should return an error if there are no users', (done) => {
            chai.request(app)
                .get('/user')
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.msg).to.be.an('array').that.is.empty;
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe('GET /user/:username', () => {
        it('should return a user by username', (done) => {
            const user = { 
                username: 'user1', 
                firstname: 'Liza', 
                lastname: 'Danilina', 
                email: 'lizadan@example.com' 
            };

            userController.createUser(user, () => {
                // Get the user
                chai.request(app)
                  .get('/user/' + user.username)
                  .then((res) => {
                    chai.expect(res).to.have.status(200)
                    chai.expect(res.body.status).to.equal('success')
                    chai.expect(res).to.be.json
                    done()
                  })
                  .catch((err) => {
                     throw err
                  })
              })
        });

        it('should return an error for non-existing user', (done) => {
            chai.request(app)
                .get('/user/user2')
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                    chai.expect(res.body.status).to.equal('error');
                    chai.expect(res.body.msg).to.include("User doesn't exist");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe('PUT /user/:username', () => {
        it('should update a user by username', (done) => {
            const user = { 
                username: 'user1', 
                firstname: 'Liza', 
                lastname: 'Danilina', 
                email: 'lizadan@example.com' 
            };

            const updatedUser = { lastname: 'Dan' };

            userController.createUser(user, () => {            
                chai.request(app)
                    .post('/user')
                    .send(user, updatedUser)
                    .then(() => {
                        return chai.request(app).put('/user/user1').send(updatedUser);
                    })
                    .then((res) => {
                        chai.expect(res).to.have.status(200);
                        chai.expect(res.body.status).to.equal('success');
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            })
        });

        it('should return an error for non-existing user on update', (done) => {
            const user = { 
                username: 'user1', 
                firstname: 'Liza', 
                lastname: 'Danilina', 
                email: 'lizadan@example.com' 
            };

            const updatedUser = { firstname: 'NewName' };

            chai.request(app)
                .put('/user/user2')
                .send(user, updatedUser)
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                    chai.expect(res.body.status).to.equal('error');
                    chai.expect(res.body.msg).to.include("User doesn't exist");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe('DELETE /user/:username', () => {
        it('should delete a user by username', (done) => {
            const user = { 
                username: 'user1', 
                firstname: 'Liza', 
                lastname: 'Danilina', 
                email: 'lizadan@example.com' 
            };

            chai.request(app)
                .post('/user')
                .send(user)
                .then(() => {
                    return chai.request(app).delete('/user/user1');
                })
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    chai.expect(res.body.status).to.equal('success');
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it('should return an error for non-existing user on delete', (done) => {
            chai.request(app)
                .delete('/user/user1')
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                    chai.expect(res.body.status).to.equal('error');
                    chai.expect(res.body.msg).to.include("User doesn't exist");
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

});
    
