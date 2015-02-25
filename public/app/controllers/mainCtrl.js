/**
 * Created by johnny on 2/23/2015.
 */

(function(app){

    'use strict';

    function mainCtrl(jobsResource){

        var vm = this;

        jobsResource.query(function(data){
            vm.jobs = data;
        });

        vm.submit = function(){

            var job = {title: vm.title, description: vm.description};

            jobsResource.save(job);

            vm.jobs.push(job);
        }

      //  vm.jobs = $resource('/api/jobs').query();

    }

    app.controller('mainCtrl',['jobsResource', mainCtrl]);
}(angular.module('mainApp')));
