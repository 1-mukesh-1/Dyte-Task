"use strict";

var mysql = require('mysql');
const _ = require("lodash");
const { MoleculerError } = require("moleculer").Errors;
const fake = require("fakerator")();


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

function insertData(idd,target){
    console.log(idd);
    console.log(target);
    con.connect(function(err) {
      // if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO webhook_data VALUES ("+idd+",'"+target+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
}

function updateData(idd,target){
    con.connect(function(err) {
      var sql = "UPDATE webhook_data SET targetUrl = '"+target+"' WHERE id = "+idd+"";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
    });
}

function deleteData(idd){
    var x=true;
    con.connect(function(err) {
      var sql = "DELETE FROM webhook_data WHERE id = "+idd+"";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
        if(parseInt(result.affectedRows)==0){
            x=false;
            return false;
        }
      });
    });
    return x;
}

module.exports = {
    name: "webhooks",

    settings: {
    },

    actions: {
        list: {
            cache: true,
            rest: "GET /",
            handler(ctx) {
                return this.rows;
            }
        },


        get: {
            cache: {
                keys: ["id"]
            },
            rest: "GET /:id",
            handler(ctx) {
                const post = this.findByID(ctx.params.id);
                if (post)
                    return post;

                return Promise.reject(new MoleculerError("Post not found!", 404));
            }
        },

        feed: {
            rest: "GET /feed",
            handler(ctx) {
                return this.rows;
            }
        },

        create: {
            rest: "POST /",
            handler(ctx) {                
                this.rows.push(ctx.params);
                insertData(ctx.params.id,ctx.params.targetUrl);
                this.clearCache();
                return this.rows[this.rows.length - 1].id;
            }
        },

        update: {
            rest: "PUT /:id",
            handler(ctx) {
                const post = this.findByID(ctx.params.id);
                if (post) {
                    if (ctx.params.targetUrl)
                        post.targetUrl = ctx.params.targetUrl;
                    updateData(ctx.params.id,ctx.params.targetUrl);
                    this.clearCache();
                    return "success";
                }
                return Promise.reject(new MoleculerError("Post not found!", 404));
            }
        },

        remove: {
            rest: "DELETE /:id",
            handler(ctx) {
                this.rows = this.rows.filter(row => row.id != ctx.params.id);
                var status=deleteData(ctx.params.id);
                this.clearCache();
                console.log(status);
                if(status) return "deleted successfully";
                return "Failed to delete/ record not found";
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