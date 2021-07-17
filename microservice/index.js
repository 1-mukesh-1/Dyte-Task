"use strict";
let path        = require("path");
let { ServiceBroker }   = require("moleculer");
const ApiService = require("moleculer-web");

// Create broker
let broker = new ServiceBroker({
  logger: console,
  cacher: "memory",
  metrics: true,
  validation: true
});

// Load other services
broker.loadService(path.join(__dirname, "", "webhook.service"));
broker.loadService(path.join(__dirname, "", "trigger.service"));

// Load API Gateway
broker.createService({
  mixins: ApiService,
  settings: {
    routes: [{
      // RESTful aliases
      aliases: {
        "GET webhooks": "webhooks.list",
        "GET webhooks/:id": "webhooks.get",
        "POST webhooks": "webhooks.create",
        "PUT webhooks/:id": "webhooks.update",
        "DELETE webhooks/:id": "webhooks.remove"
        // "REST webhooks": "webhooks"
      },
      mappingPolicy: "restrict"
    },
    {
      // RESTful aliases
      aliases: {
        "POST triggers": "triggers.trigger"
        // "REST webhooks": "webhooks"
      },
      mappingPolicy: "restrict"
    }
    ]
  }
});

// Start server
broker.start();