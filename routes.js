var faker = require("faker")
var appRouter = function(app){
    app.get("/users/:number",function(req,res){
        var data = []
        var number = req.params.number
        if(isFinite(number) && number >0){
        for(i=0;i<number;i++){
            var user = {
                firstName : faker.name.firstName(),
                lastName : faker.name.lastName(),
                userName : faker.internet.userName(),
                email : faker.internet.email()
            }
            data.push(user)
        }
    

        res.status(200).send(data);
    }else if(number == 0 && number == "0"){
        res.status(500).send({message : "Oops! Number cannot be zero"});
    }
        else{
        res.status(500).send({message : "Oops! Wrong number type"});
    }
    })




    app.get("/user",function(req,res){
            var user = {
                firstName : faker.name.firstName(),
                lastName : faker.name.lastName(),
                userName : faker.internet.userName(),
                email : faker.internet.email()
            }
    

        res.status(200).send(user);
        })


}


module.exports = appRouter;