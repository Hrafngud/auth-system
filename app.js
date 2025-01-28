const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Centralized routes

const app = express();

// Load SSL certificate and private key
const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');
const passphrase = process.env.SSL_PASSPHRASE; // Add passphrase from .env if exists

const credentials = { key: privateKey, cert: certificate, passphrase: passphrase };

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'https://localhost:5005' })); // Replace with the actual port
// Use centralized routes
app.use('/api', routes);

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));


const PORT = process.env.PORT || 5005;
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
});
