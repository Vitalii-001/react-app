const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const app = module.exports = express();
_ = require('lodash');

// import SequelizeFile from 'sequelize-file';
// const SequelizeFile = require('sequelize-file');
// import { backgroundImage } from './helpers/attachments';

// const picture = SequelizeFile({
//     attribute: 'picture',
//     mimetype: /^image/,
//     crop: true,
//     sizes: {
//         small: 64, //width 64
//         big: 150, //width 150
//     }
// });
//
// const backgroundImage = SequelizeFile({
//     attribute: 'backgroundImage',
//     mimetype: /^image/,
//     crop: true,
//     sizes: {
//         preview: "x350" // height 350
//     }
// });



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
//
// picture.addTo(Photo);
// backgroundImage.addTo(Photo);


sequelize.sync({force: true}).then(() => {
    return Photo.create({
        name: "Auto create photo",
        pointer: "sales",
        tooltip: "Text about auto-create photo",
        preview: "https://cdn.pixabay.com/photo/2016/09/01/10/23/image-1635747_960_720.jpg"
    });

}).catch(e => console.log("ERROR SYNCING WITH DB", e));

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
    .delete(function(req, res){
        Photo.findById(req.params.photo_id).then(function(photo){
            photo.destroy().then(function(photo){
                res.json(photo);
            });
        });
    })
    .put(function(req, res){
        Photo.findById(req.params.photo_id).then(function(photo){
            photo.update(_.pick(req.body, ['name', 'pointer', 'tooltip', 'preview'])).then(function(photo){
                res.json(photo);
            });
        });
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