# Empamini Express API server
This repo contains a demo API server written in Express that is meant for demo purposes only. All data is dummy data.

### Prerequisites and main libs

[node](https://nodejs.org/en/download/) (v14.14.0)

[npm](https://www.npmjs.com/get-npm) (v6.14.8)

[express](https://github.com/expressjs/express) * web framework

[helmet](https://github.com/helmetjs/helmet)  * security

[morgan](https://www.npmjs.com/package/morgan) * log


## Installation

```npm install```


## Execution

```npm start```

API server will be available at `http://localhost:3000`

## Available Enpoints

`GET /info`: Will return version and timestamp of the server.

`POST /login`: Will return the `id` of the user.

`GET /users/:id`: Will return the information of the user with the given `id`

`GET /users/:id/orders`: Will return the list of orders for the user with the given `id`

`DELETE /orders/:id`: Will cancel the order with the given `id`



