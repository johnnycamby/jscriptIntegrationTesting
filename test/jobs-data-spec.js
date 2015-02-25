
// ============= Integration tests  ==================================
// Install mocha (npm install mocha -g)
// Install chai (npm install --save-dev chai)

// =========== organising asynchronous calls with nested callbacks =========================
// install bluebird (npm install bluebird --save)


var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var jobsData = require('../util/jobs-data.js');

function resetJobs() {
    return new Promise(function (resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe('get jobs', function(){

    var jobs;

    before(function(done) {

        jobsData.connDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function (colln) {
                jobs = colln;
                done();
            });
    })

    // connection the connection b4 saving
    after(function(){
        mongoose.connection.close();
    })

    it('Should never be empty since jobs are seeded!', function(){
        expect(jobs.length).to.be.at.least(1);
    });

    it('should have a job title', function(){
        expect(jobs[0].title).to.not.be.empty;
    });

    it('should have a job description', function(){
        expect(jobs[0].description).to.not.be.empty;
    });

});

describe('db save jobs', function(){

    var job = {title: 'test title', description: 'test description'};
    var jobs;

    function saveTestJob(){
        return jobsData.saveJob(job);
    }

    before(function(done){
        jobsData.connDB('mongodb://localhost/jobfinder')
            .then(resetJobs)
            .then(function(){return jobsData.saveJob(job)})
            .then(jobsData.findJobs)
            .then(function setJobs(colln){
                jobs = colln;
                done();
            });
    })

    // close the connection 4 precaution
    after(function(){
        mongoose.connection.close();
    })

    it('should have one job after saving one job', function(){
        expect(jobs).to.have.length(1); // since 1 job has been saved
    })


})




/*
 describe('get jobs', function(){
 it('Should never be empty since jobs are seeded!', function(done){
 mongoose.connect('mongodb://localhost/jobfinder', function(){
 resetJobs().then(function(){
 jobModel.seedJobs().then(function(){
 mongoose.model('Job').find({}).exec(function(err, jobsList){
 expect(jobsList.length).to.be.at.least(1);
 done();
 });
 });
 });
 });
 });
 });
*/

