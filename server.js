const express = require('express');
const app = express();
const mongodb = require('./data/database');
const createError = require('http-errors');

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes'));
app.use((req, res, next)=>{
    next(createError(404, 'Not found'));
  });
  
  app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });

mongodb.initDb((err)=>{
    if(err){
      console.log("There is an error: "+ err);
    }else{
      app.listen(PORT, () => {
        console.log('Database conected and Web Server is listening at port ' + (PORT));
      });
    }
  });