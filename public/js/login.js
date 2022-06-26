/* eslint-disable  */

const loginForm = document.querySelector('#loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signin',
      data: {
        email: email,
        password: password,
      },
    });

    if (res.data.status === 'success') {
      //   showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);

      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    // showAlert('error', err);
  }
};
