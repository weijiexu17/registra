'use strict';

var https = require('https');
var request = require('request');
var gohealthuc = "https://apistage.gohealthuc.com:1981/v1/eligibility_demo";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.getEligibility=function(req, res){
    console.log("getEligibility");
    console.log(JSON.stringify(req.body))
    request.post({
    headers: {
        'authtoken': 'ghweijie5691',
        'content-type' : 'application/x-www-form-urlencoded'},
    url:     gohealthuc,
    body:    JSON.stringify(req.body)
}, function(error, response, body){
        console.log(body);
        console.log(response.statusCode);
        
        if(response.statusCode >=300){
            res.end("{}");
        }
        else{
            //console.log(body);
            var benefit = JSON.parse(body)
            console.log("benefit: " + benefit);
            var eligibility = benefit.data.coverage;
            var insActive = eligibility.active;
            console.log("Is Active: " + insActive);
            
            var copayObj = eligibility.copay.filter(copay=>copay.in_plan_network=="yes");
            var copay = ""
            if(copayObj){
                console.log(copayObj)
                console.log(copayObj[0].copayment.amount)
                copay = copayObj[0].copayment.amount;
            }
            res.end(JSON.stringify({
                subscriber: benefit.data.subscriber,
                active: insActive,
                copay: copay
            }));
        }
    });
}

