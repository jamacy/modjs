var utils = require('../utils'),
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore');


exports.summary = 'Validate JavaScript/CSS source';

exports.usage = '<source>';

exports.options = {

    "charset" : {
        alias : 'c'
        ,default : 'utf-8'
        ,describe : 'file encoding type'
    }
};

// TODO
exports.run = function (opt, callback) {

    var source = opt.source;
    var ext = path.extname(source);

    var taskMap = {
        '.js' : 'jshint',
        '.css' : 'csslint'
    };

    var realTask = taskMap[ext];

    try {

        if(realTask){

            exports.runTask(realTask, opt, callback);
        }else{
            callback("No task");
        }


    }catch (err){
        return callback(err);
    }

};
