var redis = require("redis");
const configure = require('./configure')

// Create a Redis client instance
const config = configure()
var db = redis.createClient({
  host: config.redis.host || 'redis', 
  port: config.redis.port || 6379,    
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }
});

// Event listener for Redis errors
db.on('error', (err) => {
  console.error('Redis error:', err);
});

// Event listener for successful connection to Redis
db.on('connect', () => {
  console.log('Connected to Redis');
});

// Handle graceful shutdown (SIGINT - Ctrl+C)
process.on('SIGINT', function() {
  db.quit();
});

module.exports = db;
