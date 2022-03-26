const pg = require('pg');

const connectionURI = 'postgres://trjaorog:ELK7R9ie2bhwx8_SobZy4lBEfkXXXwBU@kashin.db.elephantsql.com/trjaorog';
const client = new pg.Client(connectionURI);
client.connect((err) => {
  if(err) {
    return console.log('Could not connect to postgres', err);
  }
  else{
    console.log("Succesfully connected to database");
  }
});


module.exports = {
  query : (text, params, cb) => {
    console.log('Queried with the following text: ',text);
    return client.query(text, params,cb)
  }
}

