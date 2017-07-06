const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Sequelize = require('sequelize');
const app = express();

sequelize = new Sequelize('sqlite://' + path.join(__dirname, 'database.sqlite'), {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite')
});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;