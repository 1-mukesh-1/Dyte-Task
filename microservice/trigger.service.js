"use strict";

var mysql = require('mysql');
const _ = require("lodash");
const { MoleculerError } = require("moleculer").Errors;
const fake = require("fakerator")();
const axios = require('axios')


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webhooks"
});


function getDataFromDB() {
    let rows = [];

    con.connect(function(err) {
      // if (err) throw err;
      con.query("SELECT * FROM webhook_data", function (err, result, fields) {
        if (err) throw err;
        for(var i=0;i<result.length;i++){
            var temp = new Object();
            temp.id=result[i].id;
            temp.targetUrl=result[i].targetUrl;
            rows.push(temp);
        }
      });
    });
    return rows;
}

function makeRequest(url,data,times){
    if(times==0) return 0;
    data = JSON.stringify(data);
    axios.post(url, data)
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
    })
    .catch(error => {
        console.error(error)
        makeRequest(url,data,times-1);
    })
}

module.exports = {
    name: "triggers",

    settings: {
    },

    actions: {
        trigger: {
            cache: {
                keys: ["id"]
            },
            rest: "POST /",
            handler(ctx) {
                // trigger activity
                var temp=this.rows;
                for(var i=0;i<temp.length;i++){
                    var curr=temp[i].targetUrl;
                    var data={
                        "ipAddr" : ctx.params.ipAddr,
                        "timestamp" : ctx.params.timestamp 
                    }
                    makeRequest(curr,data,5);
                }
                return "Trigger activated sending requests... and request sent successfully";
                return Promise.reject(new MoleculerError("Post not found!", 404));
            }
        }
    },

    methods: {
        findByID(id) {
            return this.rows.find(item => item.id == id);
        },

        clearCache() {
            this.broker.broadcast("cache.clean", this.name + ".*");
        }
    },

    created() {
        this.logger.debug("Getting data from Database...");
        this.rows = getDataFromDB();
    }
};