const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');
const bodyParser = require("body-parser");


// Gets All Webhooks
router.get('/', (req, res) => {
    var x;
    var url = 'http://localhost:3000/webhooks/';
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, resp, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (resp.statusCode !== 200) {
          console.log('Status:', resp.statusCode);
        } else {
          // data is already parsed as JSON:
          x=JSON.parse(data);
          res.send(x);
        }
    });
});

// Get Single Webhook
router.get('/:id', (req, res) => {
    var x;
    var url = 'http://localhost:3000/webhooks/'+req.params.id;
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, resp, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (resp.statusCode !== 200) {
          console.log('Status:', resp.statusCode);
        } else {
          // data is already parsed as JSON:
          x=JSON.parse(data);
          res.send(x);
        }
    });
});

// Create Webhook
router.post('/', (req, res) => {
    var temp =new Object();
    temp.targetUrl=req.body.targetUrl;
    axios.post('http://localhost:3000/webhooks', temp)
    .then(resp => {
        var x=JSON.parse(resp.data);
        res.send(x);
    })
    .catch(error => {
        res.json({"status" : "error"})
    })
});

// Update Webhook
router.put('/:id', (req, res) => {
    var temp =new Object();
    temp.targetUrl=req.body.targetUrl;
    axios.put('http://localhost:3000/webhooks/'+req.params.id, temp)
    .then(resp => {
        var x=JSON.parse(resp.data);
        res.send(x);
    })
    .catch(error => {
        res.json({"status" : "error"})
    })
});

// Delete Webhook
router.delete('/:id', (req, res) => {
    axios.delete('http://localhost:3000/webhooks/'+req.params.id)
    .then(resp => {
        res.json({"status" : "Success"})
    })
    .catch(error => {
        res.json({"status" : "error"})
    })
});

module.exports = router;