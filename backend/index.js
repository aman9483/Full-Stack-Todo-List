const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app  = express();


app.use(cors());
app.use(express.json())

const port = 8008;

try{

app.get('/', (req, res)=>{

    res.send("hello world");

    console.log("the server is running fine");
});

}catch(err){

    console.log(err.message);
}
try{
app.listen(port);
console.log(`the server is running on http://localhost:${port}`);

}catch(err){

     console.log(err.message);
}

//datbase connection

let = dbName = 'todoList'

let mongo_url = `mongodb://localhost:${27017}/${dbName}`;

//db connection

try {
  mongoose.connect(mongo_url, {
   
  });
  console.log(`The database is connected successfully: ${mongo_url}`);
} catch (e) {
  console.log(`Database is not connected: ${e.message}`);
}


//make routes

const todoRoute = require('./routes/todoRoute')

app.use('/api/v1', todoRoute)