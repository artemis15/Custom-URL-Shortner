const express = require('express');
const app = express();
const dbConnector = require('./config/db');


//Connecting Mongoose DB
dbConnector();


app.use(express.json({ extended:false }));

//Define routes:

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT,() => console.log(`Server running on Port ${PORT}`));

