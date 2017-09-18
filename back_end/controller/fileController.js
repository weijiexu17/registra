'use strict';

var fs = require("fs");

exports.addPatient = function(req, res) {
    console.log("addPatient");
    console.log(req.body);
    fs.readFile( __dirname + "/../data/" + "patient.json", 'utf8', function (err, data) {
        var allData = JSON.parse( "{}" );
        if(data)
            allData = JSON.parse( data );
        var fullName = req.body.firstName + req.body.lastName;
        fullName = fullName.toUpperCase();
    
        console.log("fullName = " + fullName)
        allData[fullName] = req.body;
        
        console.log( allData );
        fs.writeFile(__dirname + "/../data/" + "patient.json", JSON.stringify(allData), 'utf8', function (err, data) {
            if(err)
                res.send(err)
            res.end( JSON.stringify(allData[fullName]));
        });
        
    });
};

exports.getPatient = function(req, res) {
    console.log("getPatient");
    console.log(req.params.name)
    fs.readFile( __dirname + "/../data/" + "patient.json", 'utf8', function (err, data) {
        if(err)
            res.send(err)
        console.log(data)
        var allData = JSON.parse( "{}" );
        if(data)
            allData = JSON.parse( data );
        console.log(allData)
        var patient = JSON.parse( "{}" );
        if(allData[req.params.name.toUpperCase()])
            patient = allData[req.params.name.toUpperCase]
        
        console.log( patient );
        res.json(patient);
    });

};
