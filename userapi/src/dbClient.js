var redis = require("redis");
const configure = require('./configure')

const config = configure()
var db = redis.createClient({
  host: config.redis.host || 'redis', 
  port: config.redis.port || 6379,    
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }
});


db.on('error', (err) => {
  console.error('Redis error:', err);
});

db.on('connect', () => {
  console.log('Connected to Redis');
});


process.on('SIGINT', function() {
  db.quit();
});

module.exports = db;
