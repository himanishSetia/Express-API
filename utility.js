var fs = require('fs');
var util = require('util')
var configuration = require('./config.js')

var logs = configuration.logs
var errorLogs = configuration.errorLogs

var log_file = fs.createWriteStream(logs,{flags:'a'});
var log_stdout = process.stdout;

var error_file = fs.createWriteStream(errorLogs,{flags:'a'});
var error_stdout = process.stdout;

logger = function(log){
    log_file.write(util.format(log)+'\n');
    log_stdout.write(util.format(log)+'\n');
};


errorLogger = function(log){
    error_file.write(util.format(log)+'\n');
    error_stdout.write(util.format(log)+'\n');
}