/**
 * Created by johnny on 2/23/2015.
 */

var express = require('express');
var stylus = require('stylus');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jobsData = require('./public/app/util/jobs-data.js');

// define working enviroment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(src, path){
    return stylus(src).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));

// static route handling
app.use(express.static(__dirname + '/public'));


app.get('/api/jobs', function(req, res){
    jobsData.findJobs().then(function(colln){
        res.send(colln);
    })

})

// '*' handle all request that are known or unknown to direct them to the index
app.get('*', function(req, res){
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connDB('mongodb://xplicitdev:~johnny!@ds047901.mongolab.com:47901/jobfinder')
    .then(function(){
        console.log('connected to mongodb successfully!');
        jobsData.seedJobs();
    });

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');