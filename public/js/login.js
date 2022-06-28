/* eslint-disable  */

const loginForm = document.querySelector('#loginForm');
const btnLogout = document.querySelector('#btnLogout');
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    alert('Error logging out! Try again.');
  }
};

if (btnLogout) {
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
}

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
      url: `http://localhost:3000/api/v1/users/signin`,
      data: {
        email: email,
        password: password,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
