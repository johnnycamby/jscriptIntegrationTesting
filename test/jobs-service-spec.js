/**
 * Created by johnny on 2/24/2015.
 */

    // install SuperTest (npm install supertest)

var express = require('express');
var expect = require('chai').expect;
var request = require('supertest');
var Promise = require('bluebird');

var app = express();
var dataSavedJob;

// Mocked database
var db = {

    findJobs: function(){
        return new Promise(function(resolve, reject){
            resolve(['hi']);
        })
    },

    saveJob: function(job){
        dataSavedJob = job;
    }
};

var jobService = require('../jobs-service')(db, app);

describe('get jobs', function(){

    it('get should return back a json list of jobs', function(done){

        request(app).get('/api/jobs')
            .expect('Content-Type', /json/)
            .end(function(err, res){
                expect(res.body).to.be.a('Array');
                done();
            });
    })
})

describe('save jobs' , function(){

    it('should validate that title is > than 4 characters');

    it('should validate that title is < than 40 characters');

    it('should validate that description is > than 4 characters');

    it('should validate that description is < than 250 characters');

    var newJob = {title: 'Cook', description:"You l'l be making bread"};

    it('should pass the job to the database save', function(done){

        // is asynchronous coz it takes a request and response
        request(app).post('/api/jobs').send(newJob).end(function(err, res){
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        })

    });

    it('should return a status of 200 to the front end if the database saved');

    it('should return a job with an id');

    it('should return an error if the database failed');

});