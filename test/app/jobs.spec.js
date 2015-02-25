/**
 * Created by johnny on 2/24/2015.
 */

describe('posting jobs', function(){

    var postRequestJob;
    var newJob = {title: 'test title', description: 'test description'};

    beforeEach(module('mainApp'));

    it('should call /api/jobs with job data', inject(function($httpBackend, jobsResource){

        $httpBackend.whenPOST('/api/jobs', function(data){
            postRequestJob = JSON.parse(data);

            expect(postRequestJob).to.not.be.empty;
            return true;

        }).respond(200);

        jobsResource.save(newJob);
        $httpBackend.flush;


    }));
})
