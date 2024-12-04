const db = require('../dbClient'); 

module.exports = {

  // Create user
  createUser: (user, callback) => {
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    }
    
    // Check if user already exists
    db.hgetall(user.username, function(err, res) {
      if (err) return callback(err, null)
      if (!res) {
        // Save to DB
        db.hmset(user.username, userObj, (err, res) => {
          if (err) return callback(err, null)
          callback(null, res)
        })
      } else {
        callback(new Error("User already exists"), null)
      }
    })
  },

  // Get all users
  getAllUsers: (callback) => {
    db.keys('*', (err, keys) => {
      if (err) return callback(err, null);

      if (keys.length === 0) return callback(null, []);

      const multi = db.multi();
      keys.forEach(key => {
        multi.hgetall(key);
      });

      multi.exec((err, users) => {
        if (err) return callback(err, null);
        return callback(null, users.filter(user => user !== null));
      });
    });
  },

  // Get user by username
  getUserByUsername: (username, callback) => {
    if (!username) 
      return callback(new Error("Username must be provided"), null);

    db.hgetall(username, (err, res) => {
      if (err) return callback(err, null);
      if (res)
        return callback(null, res);
      else
      return callback(new Error("User doesn't exist"), null);
    });
  },

  // Update user
  updateUser: (username, userData, callback) => {
    if (!username) 
      return callback(new Error("Username must be provided"), null);

    db.hgetall(username, (err, res) => {
      if (err) 
        return callback(err, null);
      if (!res) 
        return callback(new Error("User doesn't exist"), null);

      const updatedUser = {
        ...res,
        ...userData
      };

      db.hmset(username, updatedUser, (err, res) => {
        if (err) 
          return callback(err, null);

        return callback(null, res);
      });
    });
  },
  
   // Delete user
   deleteUser: (username, callback) => {
    if (!username)
      return callback(new Error("Username must be provided"), null);

    db.del(username, (err, res) => {
      if (err) 
        return callback(err, null);

      if (res === 1)
        return callback(null, { message: "User deleted successfully" });
      else
      return callback(new Error("User doesn't exist"), null);
    });
  }
};
