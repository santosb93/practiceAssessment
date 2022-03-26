const express = require('express');
const cors = require('cors');
const app = express();
const userController = require('./userController.js');


app.use(cors());
app.use(express.json());


app.post('/create', userController.createAccount, (req,res) => {
  return res.status(200).json({message: `Account ${res.locals.username} has been created`});
})

app.post('/login', userController.login, (req, res) => {
  return res.status(200).json({message: res.locals.message});
})

app.patch('/updatePassword', userController.updatePassword, (req, res) => {
  return res.status(200).json({message: res.locals.message});
})

app.delete('/delete/:username', userController.delete, (req, res) => {
  return res.status(200).json({message: res.locals.message});
})



app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error in unknown middleware',
    message: {err: 'Error in unknown middleware'}
  }
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(500).json(errObj.message);

})


app.listen(3000, ()=>console.log('listening on port 3000'));

