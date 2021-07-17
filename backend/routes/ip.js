const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const webhooks = require('../Webhooks');
const axios = require('axios')
const moment = require('moment');

function makeRequest(url,data){
    axios.post(url,data)
      .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
}

// Gets All Webhooks
router.get('/', (req, res) => {
    console.log('Hello');
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    var timestamp = new Date().getTime();
    var data={
        "ipAddr" : ip,
        "timestamp" : timestamp
    }
    makeRequest("http://localhost:3000/triggers",);
    res.json({
        "status": "webhook.trigger ..."
    });
});

module.exports = router;