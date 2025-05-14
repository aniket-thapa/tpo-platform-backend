require('dotenv').config();
const http = require('http');
const app = require('./app');
const { setupSocket } = require('./socket');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
