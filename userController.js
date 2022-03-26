const userController = {};
const db = require('./model.js');

userController.createAccount = async (req,res,next) => {
  const {name, password, email, username} = req.body;
  const queryObj = {
    text: 'INSERT INTO users (name, password, email, username) VALUES ($1,$2,$3,$4)',
    values: [name,password,email,username]
  }
  try {
    await db.query(queryObj);
    res.locals.username = username;
    return next();
  } catch(err) {
    return next({
      log: 'Error in userController.createAccount',
      message: {err}
    })
  }
}

userController.login = async (req,res,next) => {
  console.log('req.body', req.body);
  const {username, password} = req.body;
  const queryObj = {
    text: 'SELECT users.email, users.name FROM users WHERE username = $1 AND password = $2',
    values: [username,password]
  }
  try {
    const dbRes = await db.query(queryObj);
    if (!dbRes.rows[0]) {
      res.locals.message = "Username/Password does not exist";
      return next();
    } 
    const {name, email} = dbRes.rows[0];
    res.locals.message = `Successfully logged in, name: ${name}, email: ${email}, username: ${username}`;
    return next();
  } catch(err) {
    return next({
      log: 'Error in userController.login',
      message: {err: err}
    })
  }
}

userController.updatePassword = async (req,res,next) => {
  console.log('req.body', req.body);
  const {username, password} = req.body;
  const queryObj = {
    text: 'UPDATE users SET password = $1 WHERE users.username = $2',
    values: [password,username]
  }
  try {
    const dbRes = await db.query(queryObj);
    console.log('dbRes.rowCount', dbRes.rowCount);
    console.log(typeof dbRes.rowCount)
    if (dbRes.rowCount === 0){
      console.log('entering here');
      res.locals.message = 'Password has not been updated, username does not exist';
      return next();
    }else{
      res.locals.message = 'Password has been updated'
      return next();
    }
  } catch(err) {
    return next({
      log: 'Error in userController.updatePassword',
      message: {err: err}
    })
  }
}

userController.delete = async (req,res,next) => {
  console.log('req.param', req.params);
  const {username} = req.params;
  const queryObj = {
    text: 'DELETE FROM users WHERE users.username = $1',
    values: [username]
  }
  try {
    const dbRes = await db.query(queryObj);
    if (dbRes.rowCount === 0){
      res.locals.message = 'Account has not been deleted, username does not exist';
      return next();
    }else{
      res.locals.message = 'Account has been deleted'
      return next();
    }
  }catch (err){
    return next({
      log: 'Error in userController.delete',
      message: {err}
    })
  }
}




module.exports = userController;