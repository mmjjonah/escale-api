"use strict"

const express = require('express')
const dotenv = require('dotenv')
const ROUTES = require('./app.routing')

const app = express()
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

console.log(ROUTES);
ROUTES.map((route) => {
  app.use(route.path, require(`./controllers/${route.controller}`) )
})

app.listen(process.env.PORT, () => {
  console.log(`Serveur connecter : \n PORT: ${process.env.PORT}`)
})