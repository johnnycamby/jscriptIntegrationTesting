/**
 * Created by johnny on 2/24/2015.
 */


var mongoose = require('mongoose');
var Promise = require('bluebird');
var jobModel = require('../models/Job');

//var Job  = mongoose.model('Job');
var Job  = jobModel.model;

var findJobs = function(query){
    return Promise.cast( Job.find(query).exec());
}

var createJob = Promise.promisify(Job.create, Job);

var jobs = [
    {title: 'Cook', description:"You l'l be making bread"},
    {title: 'Programmer', description:"You l'l be developing in java script"},
    {title: 'Waiter', description:"You l'l be serving in a 5 star restuarant"},
    {title: 'Driver', description:"You l'l be driving food trucks"}

];

// ========== exports ========================= //
exports.connDB = Promise.promisify(mongoose.connect, mongoose);
exports.findJobs = findJobs;
exports.saveJob = createJob;
exports.seedJobs = function(){
    return findJobs({})
        .then(function(collection){
            if(collection.length === 0){
                return Promise.map(jobs,function(job){
                    return createJob(job);
                })
            }
        })
}




