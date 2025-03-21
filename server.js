const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(PORT, () => {
    console.log('Database conected and Web Server is listening at port ' + (PORT));
  });