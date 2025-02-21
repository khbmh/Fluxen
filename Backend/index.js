require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 4000;

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const username = process.env.USER;
const password = process.env.PASS;

// MongoDB connection URL
const uri = `mongodb+srv://${username}:${password}@cluster0.pzdjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client.db('fluxen').collection('users');
  
    // GET all users
    app.get('/users', async (req, res) => {
      try {
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching products:', error);
        res
          .status(500)
          .send({ error: 'An error occurred while fetching products.' });
      }
    });

    // get user by email
    app.get('/users/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const user = await usersCollection.findOne({ email });
        if (user) {
          res.send(user);
        } else {
          res.status(404).send({ error: 'User not found.' });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res
          .status(500)
          .send({ error: 'An error occurred while fetching the user.' });
      }
    });

    // POST a new user
    app.post('/users', async (req, res) => {
      try {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
      } catch (error) {
        console.error('Error inserting product:', error);
        res
          .status(500)
          .send({ error: 'An error occurred while inserting the product.' });
      }
    });

    // PATCH: Update user role
    app.patch('/users/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const { role } = req.body;

        // Validate the role
        if (!['user', 'moderator', 'admin'].includes(role)) {
          return res.status(400).send({ error: 'Invalid role.' });
        }

        // Update the user role
        const result = await usersCollection.updateOne(
          { email },
          { $set: { role } },
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ error: 'User not found.' });
        }

        res.send({ message: `User role updated to ${role}` });
      } catch (error) {
        console.error('Error updating user role:', error);
        res
          .status(500)
          .send({ error: 'An error occurred while updating the user role.' });
      }
    });

    

    // console.log('mongodb connected');
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('visit: fluxen.netlify.app');
});

// Vercel automatically assigns a port, so you don't need to specify a port in your code
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
