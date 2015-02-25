/**
 * Created by johnny on 2/24/2015.
 */

// $resource :: coz we l'l be making a save call

(function(app){

    'use strict';
    var baseUrl = '/api/jobs';

    function jobsResource($resource){
        return $resource(baseUrl);
    }

    app.factory('jobsResource', ['$resource', jobsResource]);

}(angular.module('common.services')));
