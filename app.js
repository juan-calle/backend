import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import fetch from "node-fetch";
const app = express();
// Enable incoming request logging in dev mode
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
  console.log("Database connection Success!");
}).catch((err) => {
  console.error("Mongo Connection Error", err);
});



// Allows access to the request body as req.body
app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define the endpoints
app.get('/pokemon/:id', async(req, res) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
  try {
    const data = await response.json();
    console.log('response data?', data)
    const {name:name, species:{name: species}, sprites:{other:{'official-artwork':{front_default: url}}}} = data;
    console.log('while destructuring data?', name, species, url);
    res.send({name:name, species:species, url:url});
    } catch(err) {
    console.log('Error happened here!')
    console.error(error)
  }

});

app.listen(PORT, () => {
  console.clear();
  console.log(`Server started listening on port : ${PORT} 🚀`);
});
