const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userRoutes = require('./routes/user');
const db = require('./dbClient');
const promBundle = require('express-prom-bundle');
const client = require('prom-client');
require('dotenv').config();

// Handle uncaught exceptions and unhandled rejections for better error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Set the port number
let port = 3000; 
if (process.env.PORT) {
  try {
    port = parseInt(process.env.PORT, 10);
    if (isNaN(port) || port <= 0 || port > 65535) {
      console.error('Invalid PORT environment variable. Using default port 3000.');
      port = 3000;
    }
  } catch (error) {
    console.error('Error parsing PORT environment variable. Using default port 3000.', error);
    port = 3000;
  }
}

const app = express();
app.use(bodyParser.json()); // Enable JSON body parsing
app.use('/user', userRoutes); // Mount the user routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Mount Swagger UI

// Health check endpoints
app.get('/health', (req, res) => {
  res.send('OK');
});

app.get('/readiness', (req, res) => {
  res.send('OK');
});

app.get('/liveness', (req, res) => {
  res.send('OK');
});

// Handle database errors
db.on("error", (err) => {
  console.error(err)
})

// Enable URL-encoded body parsing
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send(
  "Hello! \n" +
  "To see all users in the database please enter '/user'. \n" +
  "To use Swagger UI enter '/api-docs'. \n" +
  "To check health enter '/health'"
))


const server = app.listen(port, (err) => {
  if (err) throw err
  console.log(`Server listening the port ${port}\nLink: http://localhost:${port}`)
})


module.exports = server

