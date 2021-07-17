const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const webhooks = require('../../Webhooks');
const axios = require('axios');
var request = require('request');

const idFilter = req => webhook => webhook.id === parseInt(req.params.id);

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
          console.log(x);
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
          console.log(x);
          res.send(x);
        }
    });
});

// Create Webhook
router.post('/', (req, res) => {
    console.log(req.params);
    var temp =new Object();
    temp.targetUrl=req.params.targetUrl;
    console.log(temp);
    axios.post('http://localhost:3000/webhooks', temp)
    .then(resp => {
        res.send(JSON.parse(resp));  
    })
    .catch(error => {
        res.json({"status" : "error"})
    })
    // res.redirect('/');
});

// Update Webhook
router.put('/:id', (req, res) => {
    var temp =new Object();
    temp.targetUrl=req.params.targetUrl;
    console.log(temp);
    axios.put('http://localhost:3000/webhooks/'+req.params.id, temp)
    .then(resp => {
        res.send(JSON.parse(resp));
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