const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const webhooks = require('../../Webhooks');

const idFilter = req => webhook => webhook.id === parseInt(req.params.id);

// Gets All Webhooks
router.get('/', (req, res) => res.json(webhooks));

// Get Single Webhook
router.get('/:id', (req, res) => {
    const found = webhooks.some(idFilter(req));

    if (found) {
        res.json(webhooks.filter(idFilter(req)));
    } else {
        res.status(400).json({ msg: `No webhook with the id of ${req.params.id}` });
    }
});

// Create Webhook
router.post('/', (req, res) => {
    const newWebhook = {
        ...req.body,
        id: uuid.v4(),
    };
    console.log(req.body);
    if (!newWebhook.targetUrl) {
        return res.status(400).json({ msg: 'Please include a valid target-URL' });
    }

    webhooks.push(newWebhook);
    res.json(webhooks);
    // res.redirect('/');
});

// Update Webhook
router.put('/:id', (req, res) => {
    const found = webhooks.some(idFilter(req));

    if (found) {
        webhooks.forEach((webhook, i) => {
            if (idFilter(req)(webhook)) {

                const updWebhook = { ...webhook, ...req.body };
                webhooks[i] = updWebhook
                res.json({ msg: 'Webhook updated', updWebhook });
            }
        });
    } else {
        res.status(400).json({ msg: `No webhook with the id of ${req.params.id}` });
    }
});

// Delete Webhook
router.delete('/:id', (req, res) => {
    const found = webhooks.some(idFilter(req));

    if (found) {
        res.json({
            msg: 'Webhook deleted',
            webhooks: webhooks.filter(webhook => !idFilter(req)(webhook))
        });
    } else {
        res.status(400).json({ msg: `No webhook with the id of ${req.params.id}` });
    }
});

module.exports = router;