var mysql = require('./mysql.js')
var configuration = require('./config.js')
var faker = require("faker")
var request = require('request');
// var MongoClient = require('mongodb').MongoClient
// var sql = require('mysql');

var fs = require('fs');
var util = require('util')
var dirname = configuration.dirname

var log_file = fs.createWriteStream('debug.log',{flags:'a'});
var log_stdout = process.stdout;

var error_file = fs.createWriteStream('errorLog.log',{flags:'a'});
var error_stdout = process.stdout;


logger = function(log){
    log_file.write(util.format(log)+'\n');
    log_stdout.write(util.format(log)+'\n');


    // fs.appendFile(dirname+'\debug.log',d,function(err){
    //     if (err) throw err;
    //     console.log("Saved")
    // })
};

errorLogger = function(log){
    error_file.write(util.format(log)+'\n');
    error_stdout.write(util.format(log)+'\n');
}



var appRouter = function (app) {
    app.get("/users", function (req, res) {
        console.log("REQ PARAMS ", req.params)
        console.log("REQ QUERY ", req.query)
        var data = []
        var number = req.query.number
        if (isFinite(number) && number > 0) {
            for (i = 0; i < number; i++) {
                var user = {
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    userName: faker.internet.userName(),
                    email: faker.internet.email()
                }
                data.push(user)
            }


            res.status(200).send(data);
        } else if (number == 0 && number == "0") {
            res.status(500).send({ message: "Oops! Number cannot be zero" });
        }
        else {
            res.status(500).send({ message: "Oops! Wrong number type" });
        }
    })




    app.get("/user", function (req, res) {
        console.log(JSON.stringify(req.headers));
        var user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            userName: faker.internet.userName(),
            email: faker.internet.email(),
            fileName: faker.system.fileName(),
            pharagraphs: faker.lorem.paragraphs(),
            avatar: faker.internet.avatar(),
            url: faker.internet.url(),
            ipv4: faker.internet.ip(),
            ipv6: faker.internet.ipv6(),
            exampleEmail: faker.internet.exampleEmail()
        }
        logger(user)
        console.log(user)

        errorLogger(user)

        res.status(200).send(user);
    })




    app.get("/getMovies", function (req, res) {
        request.get({ url: "https://api.themoviedb.org/3/search/movie?api_key=0f3777cf29d8eabbf19ac03e1725e29c&language=en-US&page=1&include_adult=false&query=" + req.query.name }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.status(200).send(body);
            }
        });

    })



    // app.get("/getMongoData", function (req, res) {
    //     MongoClient.connect('mongodb://locahost:27017/userDB', function (err, db) {
    //         if (err) throw err

    //         db.collection('users').find().toArray(function (err, result) {
    //             if (err) throw err

    //             res.status(200).send(result);
    //         })

    //     })


    // })

    // app.get("/getSqlData",function(req,res){

    //     var connection = sql.createConnection({
    //         host : req.query.host,
    //         user : req.query.user,
    //         password : req.query.password,
    //         database : req.query.db
    //     })
    //     connection.connect();

    //     if(req.query.table){
    //     connection.query('select * from '+req.query.table,function(err,rows,fields){
    //         if (err) res.status(200).send({ message: "Table Name not Valid" });

    //         res.status(200).send(rows);
    //     })}else{
    //         res.status(500).send({ message: "Oops! Please Enter Table Name" });
    //     }
    // })


    // app.get('/login',function(req,res){
    //     var connection = sql.createConnection({
    //         host : 'localhost',
    //         user : 'root',
    //         password : '',
    //         database : 'movieDB'
    //     })
    //     connection.connect();
    //     var loginQuery = "select * from login where email='"+req.query.email+"' and password='"+req.query.password+"'";
    //     logger(loginQuery)
    //     if(req.query.email){
    //         if(req.query.password){
    //         connection.query(loginQuery,function(err,rows,fields){
    //             if (err) res.status(500).send({ message: "Something went wrong" });
    //             if(rows.length){
    //                 logger("User Found")
    //                 res.status(500).send({data : rows, success: true,message: "Valid User"});    
    //             }else{
    //                 errorLogger("No User Found")
    //                 res.status(500).send({ message: "No User Found" ,success: false,data:[]});
    //             }
    //         })}else{
    //             errorLogger("Please Enter Password")
    //             res.status(500).send({ message: "Please Enter Password" ,success: false,data:[]});
    //         }
    //     }else{
    //         if(req.query.password){
    //             errorLogger("Please Enter Email Id")
    //             res.status(500).send({ message: "Please Enter Email Id" ,success: false,data:[]});
    //         }else{
    //             errorLogger("Please Enter Email Id and Password")
    //             res.status(500).send({ message: "Please Enter Email Id and Password" ,success: false,data:[]});
    //         }
            
    //     }
    // })


}


module.exports = appRouter;