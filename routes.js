// var mysql = require('./mysql.js')
var configuration = require('./config.js')
// var utility = require('./utility.js')
var faker = require("faker")
var request = require('request');
// var MongoClient = require('mongodb').MongoClient
var sql = require('mysql');



var appRouter = function (app) {
    app.get("/users", function (req, res) {
        console.log("REQ PARAMS ", req.params)
        // utility.logger("/users PARAMS ", req.params)
        console.log("REQ QUERY ", req.query)
        // utility.logger("/users QUERY ", req.query)
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
        // utility.logger(user)
        console.log(user)

        // utility.errorLogger(user)

        res.status(200).send(user);
    })




    app.get("/getMovies", function (req, res) {
        request.get({ url: "https://api.themoviedb.org/3/search/movie?api_key=0f3777cf29d8eabbf19ac03e1725e29c&language=en-US&page=1&include_adult=false&query=" + req.query.name }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.status(200).send(body);
            }
        });

    })



    app.get('/login', function (req, res) {
        var connection = sql.createConnection({
            host: configuration.host,
            user: configuration.user,
            password: configuration.password,
            database: 'DB'
        })
        connection.connect();
        var loginQuery = "select * from login where email='" + req.query.email + "' and password='" + req.query.password + "'";
        console.log(loginQuery)
        console.log("HOST ",configuration.host)
        if (req.query.email) {
            if (req.query.password) {
                connection.query(loginQuery, function (err, rows, fields) {
                    console.log("ROWSSSSSSSSSSSSSSSSSSSSS ",rows)
                    // if (err) res.status(500).send({ message: "Something went wrong" });
                    if(rows != undefined && rows != null && rows != ''){
                    if (rows.length) {
                        console.log("User Found")
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({ data: rows, success: true, message: "Valid User" }));
                        // res.status(500).send({ data: rows, success: true, message: "Valid User" });
                    } else {
                        console.log("No User Found")
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({ message: "No User Found", success: false, data: [] }));
                        // res.status(500).send({ message: "No User Found", success: false, data: [] });
                    }}else{
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({ message: "Error occured", success: false, data: [] }));
                        // res.status(500).send({ message: "Error occured", success: false, data: [] });
                    }
                })
            } else {
                console.log("Please Enter Password")
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify({ message: "Please Enter Password", success: false, data: [] }));
                // res.status(500).send({ message: "Please Enter Password", success: false, data: [] });
            }
        } else {
            if (req.query.password) {
                console.log("Please Enter Email Id")
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify({ message: "Please Enter Email Id", success: false, data: [] }));
                // res.status(500).send({ message: "Please Enter Email Id", success: false, data: [] });
            } else {
                console.log("Please Enter Email Id and Password")
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify({ message: "Please Enter Email Id and Password", success: false, data: [] }));
                // res.status(500).send({ message: "Please Enter Email Id and Password", success: false, data: [] });
            }

        }
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


}


module.exports = appRouter;