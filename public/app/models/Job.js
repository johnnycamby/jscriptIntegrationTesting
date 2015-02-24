/**
 * Created by johnny on 2/24/2015.
 */

var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
});

mongoose.model('Job', jobSchema);


