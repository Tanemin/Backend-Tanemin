/* eslint-disable  */
const addStoreForm = document.querySelector('#addStoreForm');
const btnDeleteStore = document.querySelector('#btnDeleteStore');
const updateStoreForm = document.querySelector('#updateStoreForm');

if (btnDeleteStore) {
}

if (addStoreForm) {
  addStoreForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('storeName', document.querySelector('#storeName').value);
    form.append('description', document.querySelector('#description').value);
    form.append('owner', document.querySelector('#owner').value);
    form.append('contact', document.querySelector('#contact').value);
    form.append('imageCover', document.querySelector('#imageCover').files[0]);

    console.log(form);
    createStore(form, 'data');
  });
}
if (updateStoreForm) {
  updateStoreForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.querySelector('#id').value;
    const form = new FormData();
    form.append('storeName', document.querySelector('#storeName').value);
    form.append('description', document.querySelector('#description').value);
    form.append('owner', document.querySelector('#owner').value);
    form.append('contact', document.querySelector('#contact').value);
    if (document.querySelector('#imageCover').files[0]) {
      form.append('imageCover', document.querySelector('#imageCover').files[0]);
    }

    console.log(document.querySelector('#imageCover').files[0]);
    updateStore(id, form);
  });
}

const createStore = async (data) => {
  try {
    console.log('sukses');
    const res = await axios({
      method: 'POST',
      url: `http://localhost:3000/api/v1/store`,
      data,
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/stores');
      }, 1000);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};
const updateStore = async (id, data) => {
  try {
    console.log(data);
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/store/${id}`,
      data,
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/stores');
      }, 1000);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};
