/**
 * Created by johnny on 2/23/2015.
 */

(function(){

    'use strict';

    angular.module('mainApp')
        .controller('mainCtrl',['$resource', mainCtrl]);

    function mainCtrl($resource){

        var vm = this;

        vm.jobs = $resource('/api/jobs').query();


/*
        vm.jobs = [
            {
                title:'Sales Person',
                description:'Be already for dealers'
            },
            {
                title:'Accountant',
                description:'You good at books balancing!'
            }
        ];
*/
    }
}());
