const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Sequelize = require('sequelize');
const app = express();

sequelize = new Sequelize('sqlite://' + path.join(__dirname, 'database.sqlite'), {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite')
});

//TEST SEQUELIZE
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

Photos = sequelize.define('photos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    pointer: {
        type: Sequelize.STRING
    },
    tooltip: {
        type: Sequelize.STRING
    }
});


sequelize.sync({force: true}).then(() => {
    return Photos.create({
        name: "Auto create photo",
        pointer: "sales",
        tooltip: "Text about auto-create photo"
    });

}).catch(e => console.log("ERROR SYNCING WITH DB", e));

// PHOTO IP
app.route('/api/photos')
    .get((req, res) => {
        Photos.findAll().then((photos) => {
            res.json(photos);
        })
    })
    .post((req, res) => {
        let photo = Photos.build(_.pick(req.body, ['name', 'tooltip']));
        photo.save().then((photo) => res.json(photo));
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