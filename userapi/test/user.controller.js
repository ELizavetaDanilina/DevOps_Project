const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User Controller', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  // Create user
  describe('Create user', () => {
    it('should return an error if username is not provided', (done) => {
      userController.createUser({}, (err, res) => {
        expect(err).to.be.an('error');
        expect(err.message).to.equal("Wrong user parameters");
        expect(res).to.be.null;
        done();
      });
    });

    it('should create a new user', (done) => {
      const user = { 
        username: 'user1', 
        firstname: 'Liza', 
        lastname: 'Danilina', 
        email: 'lizadan@example.com' 
    };

      userController.createUser(user, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.equal('OK');
        done();
      });
    });

    it('should return an error if user already exists', (done) => {
        const user = { 
            username: 'user1', 
            firstname: 'Liza', 
            lastname: 'Danilina', 
            email: 'lizadan@example.com' 
        };

      userController.createUser(user, () => {
        userController.createUser(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        });
      });
    });
  });
  
  // Get all users
  describe('Get all users', () => {
    it('should return an empty array if no users exist', (done) => {
      userController.getAllUsers((err, users) => {
        expect(err).to.be.null;
        expect(users).to.be.deep.equal([]);
        done();
      });
    });

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
                userController.getAllUsers((err, users) => {
                    expect(err).to.be.null;
                    users.sort((a, b) => a.firstname.localeCompare(b.firstname));
                    expect(users).to.be.deep.equal([
                        { firstname: 'Liz', lastname: 'Dan', email: 'liz@example.com' },
                        { firstname: 'Liza', lastname: 'Danilina', email: 'lizadan@example.com' }
                        ]);
                    done();
                });
            });
        });
    });
  });
  
  // Get user by username
  describe('Get user by username', () => {
    it('should return an error if username is not provided', (done) => {
      userController.getUserByUsername(null, (err, user) => {
        expect(err).to.be.an('error');
        expect(err.message).to.equal("Username must be provided");
        expect(user).to.be.null;
        done();
      });
    });

    it('should return a user by username', (done) => {
        const user = { 
            username: 'user1', 
            firstname: 'Liza', 
            lastname: 'Danilina', 
            email: 'lizadan@example.com' 
        };

        userController.createUser(user, () => {
            userController.getUserByUsername('user1', (err, user) => {
                expect(err).to.be.null;
                expect(user).to.deep.equal({ 
                    firstname: 'Liza', 
                    lastname: 'Danilina', 
                    email: 'lizadan@example.com'
                 });
                done();
            });
        });
    });

    it('should return an error if the user does not exist', (done) => {
        const user = { 
            username: 'user1', 
            firstname: 'Liza', 
            lastname: 'Danilina', 
            email: 'lizadan@example.com' 
        };

        userController.createUser(user, () => {
            userController.getUserByUsername('user2', (err, user) => {
                expect(err).to.not.be.equal(null)
                expect(err.message).to.equal("User doesn't exist");
                expect(user).to.be.null;
                done();
          });
        });
    });
  });

  // Update user
  describe('Update user', () => {
    it('should return an error if username is not provided', (done) => {
      userController.updateUser(null, {}, (err, res) => {
        expect(err).to.be.an('error');
        expect(err.message).to.equal("Username must be provided");
        expect(res).to.be.null;
        done();
      });
    });

    it('should update an existing user', (done) => {
        const user = { 
            username: 'user1', 
            firstname: 'Liza', 
            lastname: 'Danilina', 
            email: 'lizadan@example.com' 
        };

        const updatedData = { lastname: 'Dan' };

        userController.createUser(user, () => {
            userController.updateUser('user1', updatedData, (err, res) => {
                expect(err).to.be.null;
                expect(res).to.equal('OK');
                
                userController.getUserByUsername('user1', (err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.deep.equal({ 
                        firstname: 'Liza', 
                        lastname: 'Dan',
                        email: 'lizadan@example.com'
                    });
                    done();
                });
            });
        });
    });

    it('should return an error if the user does not exist', (done) => {
        const user = { 
            username: 'user1', 
            firstname: 'Liza', 
            lastname: 'Danilina', 
            email: 'lizadan@example.com' 
        };

        const updatedData = { lastname: 'Dan' };

        userController.createUser(user, () => {
            userController.updateUser('user2', updatedData, (err, res) => {
                expect(err).to.be.an('error');
                expect(err.message).to.equal("User doesn't exist");
                expect(res).to.be.null;
                done();
            });
        });
    });
  });

  // Delete user
  describe('Delete user', () => {
    it('should return an error if username is not provided', (done) => {
      userController.deleteUser(null, (err, res) => {
        expect(err).to.be.an('error');
        expect(err.message).to.equal("Username must be provided");
        expect(res).to.be.null;
        done();
      });
    });

    it('should delete a user successfully', (done) => {
        const user = { 
            username: 'user1', 
            firstname: 'Liza', 
            lastname: 'Danilina', 
            email: 'lizadan@example.com' 
        };

        userController.createUser(user, () => {
            userController.deleteUser('user1', (err, res) => {
                expect(err).to.be.null;
                expect(res).to.deep.equal({ message: "User deleted successfully" });

                userController.getUserByUsername('user1', (err, user) => {
                    expect(err).to.not.be.equal(null)
                    expect(err.message).to.equal("User doesn't exist");
                    expect(user).to.be.null;
                    done();
                });
            });
        });
    });

    it('should return an error if the user does not exist', (done) => {
        const user = { 
            username: 'user1', 
            firstname: 'Liza', 
            lastname: 'Danilina', 
            email: 'lizadan@example.com' 
        };

        userController.deleteUser('user2', (err, res) => {
            expect(err).to.be.an('error');
            expect(err.message).to.equal("User doesn't exist");
            expect(res).to.be.null;
            done();
      });
    });
  })
  
})
