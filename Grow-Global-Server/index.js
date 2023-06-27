const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('server is running')
})

console.log()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.scg3zw6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const verifyJWT = (req, res, next) => {
  // console.log(req.headers.authorization)
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized' })
  }
  const token = authorization.split(' ')[1]
  console.log('36line ', token)

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized' })
    }
    req.decoded = decoded;
    next()
  })
}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
client.connect();

    const database = client.db('curdDB')
    const postCollection = database.collection('post')


    app.get('/posts',verifyJWT, async (req, res) => {
      const result = await postCollection.find().sort({ date: -1 }).toArray()
      res.send(result)
    })

    app.post('/add_post', async (req, res) => {
      const newItem = req.body;
      // console.log(newItem)
      const result = await postCollection.insertOne(newItem)
      res.send(result)
    })


    app.put('/update_post/:id', async (req, res) => {
      const id = req.params.id
      const options = { upsert: true }
      const filter = { _id: new ObjectId(id) }
      const itemInfo = req.body
      const updatedItemInfo = {
        $set: {
            ...itemInfo
        }
      }
      const result = await postCollection.updateOne(filter, updatedItemInfo, options)
      res.send(result)
    })

    app.delete('/delete_post/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = postCollection.deleteOne(query)
      res.send(result)
    })


    //jwt API..........
    app.post('/jwt', (req, res) => {
      const user = req.body
      // console.log(user)
      const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1hr' })
      // console.log(token)
      res.send({ token })
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log('server is running on port', +port)
})