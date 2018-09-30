const express = require('express')
const multer = require('multer')
const config = require('./config')
const Mock = require('mockjs')
const {MOCK_PORT} = require('../project-config');
const app = express()
const multipartMiddleware = multer()

const mock = (data, params) => {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return Mock.mock(data)
  } else if (typeof data === 'function') {
    return Mock.mock(data(params))
  } else {
    return 'error: data shold be an object or a function.'
  }
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', 'mock')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

config.forEach(({ method, url, data }) => {
  if (method === 'get') {
    app.get(url, (req, res) => {
      res.json(mock(data, req.query))
    })
  } else if (method === 'post') {
    app.post(url, multipartMiddleware.none(), (req, res) => {
        console.log(req.file, req.body)
      res.json(mock(data, req.body))
    })
  } else if (method === 'jsonp') {
    app.get(url, (req, res) => {
      const query = req.query

      const mockData = JSON.stringify(mock(data, req.query))

      const callback = 'typeof ' + query.callback + ' === "function" && ' + query.callback + '(' + mockData + ')'

      res.send(callback)
    })
  }
})

module.exports = app.listen(MOCK_PORT, () => {
  console.log('Mock Server listening on http://localhost:' + MOCK_PORT)
})
