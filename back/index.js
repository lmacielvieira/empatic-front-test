var express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
app.use(bodyParser.json())
app.use(
    cors({
      origin(origin, cb) {
        /* const whitelist = process.env.CORS_ORIGIN
          ? process.env.CORS_ORIGIN.split(',')
          : '*'; */
        cb(null, /* whitelist.includes(origin) */ true);
      },
      credentials: true,
      exposedHeaders: ['X-Total-Count'],
    }),
);
app.use(morgan('dev'));
app.use(helmet());
app.use((err, req, res, next) => {
  callback(new Error('Something went wrong!, err:' + err), null);
  res.status(500).send('Something went wrong!');
})
var users = {
  1: {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com"
  }
};

var orders = {
  1: {
    id: 1,
    ref: "#ord-2018-a993bee3",
    status: "paid",
    tracking: {
      carrier: "UPS",
      trackingCode: "DAJA91930102NDAKKS0",
      status: "in_transit"
    },
    items: [
      {
        sku: "emb-mb-s",
        name: "Embrace Watch - Stretchable Band Black",
        amount: 249
      }
    ],
    discounts: [
      {
        name: "Christmas 2018 - 10% OFF",
        type: "percent",
        value: 10
      }
    ]
  },
  2: {
    id: 2,
    ref: "#ord-2018-b6012cc8",
    status: "paid",
    tracking: null,
    items: [
      {
        sku: "emb-bb-s",
        name: "Embrace Watch - Stretchable Band Blue",
        amount: 249
      },
      {
        sku: "emb-mb-s",
        name: "Embrace Watch - Stretchable Band Black",
        amount: 249
      }
    ],
    discounts: [
      {
        name: "2x1 Embrace",
        type: "amount",
        value: 249
      }
    ]
  }
};

var userOrders = { orders: [orders[1], orders[2]] };

app.get("/info", function(req, res) {
  res.json({
    version: "1.0.0",
    timestamp: new Date()
  });
});

app.post("/login", function(req, res) {
  res.json({
    id: 1
  });
});

app.get("/users/:id", function(req, res) {
  res.json(users[+req.params["id"]]);
});

app.get("/users/:id/orders", function(req, res) {
  res.json(userOrders);
});

app.delete("/orders/:id", function(req, res) {
  res.json({
    orderId: +req.params["id"],
    status: "cancelled",
    order: orders[+req.params["id"]]
  });
});

console.log("Server is starting at localhost:3000");
app.listen(3000);
