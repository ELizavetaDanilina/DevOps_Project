const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userRoutes = require('./routes/user');
const db = require('./dbClient');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});


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
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', async (req, res) => {
  res.send('OK');
  try {
    const value = await client.get('version');
    res.send({ version: value || 'v2' }); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send('Error');
  }
});

app.get('/readiness', async (req, res) => {
  res.send('OK');
  try {
    const value = await client.get('version');
    res.send({ version: value || 'v2' }); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send('Error');
  }
});

app.get('/liveness', async (req, res) => {
  res.send('OK');
  try {
    const value = await client.get('version');
    res.send({ version: value || 'v2' }); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send('Error');
  }});

db.on("error", (err) => {
  console.error(err)
})

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

