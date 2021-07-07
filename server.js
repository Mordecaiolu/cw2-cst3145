const express = require('express')
const { ObjectID } = require('mongodb')
// const bodyParser = require('body-parser')

// Create an Express.js instance:
const bodeParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(bodeParser.json({limit: '5000kb'}))

//express.js
app.use(express.json())
app.set('port', 3000)
app.use ((_req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// connect to MongoDB

const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb+srv://Mordecai:tomisin.@cluster0.j9uqx.mongodb.net/test', (_err, client) => {

    db = client.db('school')

})

// display a message for root path to show that API is working
app.get('/', (_req, res, _next) => {
    res.send('select a collection, e.g., /collection/messages')
})

// get the collection name
app.param('collectionName', (req, _res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    // console.log('collection name:', req.collection)
    return next()
})

// retrive all the objects from a collection
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e);
         res.send(results)
    })
})
// post
app.post("/collection/:collectionName", (req, res, _next) => {
  const Orders = req.body;
  req.collection
    .insertOne(order)
    .then((_) => {
      res.status(200).send({
        status: true,
        message: "Order submitted",
      });
    })
    .catch((err) => {
      res.status(404).send({
        status: false,
        message: "Can't submit order due to error from me",
      });
    });
});
// put
app.put('/collection/:collectionName/:id', (req, res, next) => {
    req. collection.update(
        {_id: new ObjectID(req.params.id)},
        {$set: req.body},
        {safe: true, multi: false},
        (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
        })
})

app.delete('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.deleteOne(
        {_id: ObjectID(req.params.id) },(e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ?
            {msg: 'success'} : {msg: 'error'})
        })
})

  //sends static files from the public path directory
  app.use('/static/images', express.static(imagePath));
  app.use(function(request, response,next) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.end("Erro finding image, please confirm the name");
      
  });
const port = process.env.PORT || 3000
app.listen(port)