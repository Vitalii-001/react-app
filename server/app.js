const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
// const app = express();
_ = require('lodash');

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

Photo = sequelize.define('photos', {
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
    },
    preview: {
        type: Sequelize.STRING
    }
});


sequelize.sync({force: true}).then(() => {
    return Photo.create({
        name: "Auto create photo",
        pointer: "sales",
        tooltip: "Text about auto-create photo",
        preview: ""
    });

}).catch(e => console.log("ERROR SYNCING WITH DB", e));

const app = module.exports = express();
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));

// PHOTO IP
app.route('/api/photos')
    .get((req, res) => {
        Photo.findAll().then((photos) => {
            res.json(photos);
        })
    })
    .post((req, res) => {
        let photo = Photo.build(_.pick(req.body, ['name', 'pointer', 'tooltip', 'preview']));
        photo.save().then((photo) => res.json(photo));
    });

app.route('/api/photos/:photo_id')
    .get(function(req, res){
        Photo.findById(req.params.photo_id).then(function(photo){
            res.json(photo);
        });
    })
    .put(function(req, res){
        Photo.findById(req.params.photo_id).then(function(photo){
            photo.update(_.pick(req.body, ['name', 'pointer', 'tooltip', 'preview'])).then(function(photo){
                res.json(photo);
            });
        });
    })


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;