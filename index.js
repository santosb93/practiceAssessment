document.addEventListener('DOMContentLoaded', () => {
  const createAccountElements = document.querySelector('.form--create_account').elements;
  const loginFormElements = document.querySelector('.form--login').elements;
  const changePasswordElements = document.querySelector('.form--change_password').elements;
  const signUpBtn = document.querySelector('.create_account__btn');
  const loginBtn = document.querySelector('.login__btn');
  const changePasswordBtn = document.querySelector('.change_passsword__btn');
  const deleteBtn = document.querySelector('.delete__btn')
  const serverResponse = document.querySelector('#server_response');
  const frontEndResponse = document.querySelector('#frontend_response');
  const deleteAccountElements = document.querySelector('.form--delete_account');

  const handleCreateAccountSubmit = (e) => {
    const username = createAccountElements[0].value;
    const password = createAccountElements[1].value;
    const name = createAccountElements[2].value;
    const email = createAccountElements[3].value;
    e.preventDefault();
    fetch('http://localhost:3000/create',{
      method: "POST",
      body: JSON.stringify({
        name, password, username, email
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => serverResponse.innerText = data.message)
    .catch(err => serverResponse.innerText = err);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const username = loginFormElements[0].value;
    const password = loginFormElements[1].value;
    fetch('http://localhost:3000/login', {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers:{
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => serverResponse.innerText = data.message)
    .catch(err => serverResponse.innerText = err);
  }
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    const username = changePasswordElements[0].value;
    const password = changePasswordElements[1].value;
    const confirmPassword = changePasswordElements[2].value;
    if (password !== confirmPassword){
      frontEndResponse.innerText = "Passwords do not match"
      return;
    }
    fetch('http://localhost:3000/updatePassword',{
      method: 'PATCH',
      body: JSON.stringify({
        username,password
      }),
      headers:{
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data =>serverResponse.innerText = data.message)
    .catch(err => serverResponse.innerText = err);
  }

  const handleDeleteAccountSubmit = (e) => {
    e.preventDefault();
    const username = deleteAccountElements[0].value;
    console.log('clicking Delete', username);
    fetch(`http://localhost:3000/delete/${username}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => serverResponse.innerText = data.message)
    .catch(err => serverResponse.innerText = err);
  }
  signUpBtn.addEventListener('click', (e)=> handleCreateAccountSubmit(e));
  loginBtn.addEventListener('click', (e)=> handleLoginSubmit(e));
  changePasswordBtn.addEventListener('click', (e) => handleChangePasswordSubmit(e));
  deleteBtn.addEventListener('click', (e) => handleDeleteAccountSubmit(e));
})