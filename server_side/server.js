const express = require('express');
const cors = require('cors');
const connection = require('./mysqlConfig');
const routes = require('./routes');

const app = express();

//connecting to mySQL database
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to mySQL...');
});

app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(express.json());
app.use('/drugs', routes);

const port = process.env.port || 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));