/**
 * Created by johnny on 2/24/2015.
 */

//var express = require('express');
var bodyParser = require('body-parser');

// pass a database reference using root's module.exports function
module.exports = function(db, app) {

    app.use(bodyParser.json());

    app.get('/api/jobs/', function(req, res){
        db.findJobs().then(function(colln){
            res.send(colln);
        })
    })

    app.post('/api/jobs', function (req, res) {
        db.saveJob(req.body);
        res.end();
    })

}