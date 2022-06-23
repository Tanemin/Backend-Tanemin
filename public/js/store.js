/* eslint-disable  */
const addStoreForm = document.querySelector('#addStoreForm');
const btnDeleteStore = document.querySelector('#btnDeleteStore');
const updateStoreForm = document.querySelector('#updateStoreForm');

if (btnDeleteStore) {
}

if (addStoreForm) {
  addStoreForm.addEventListener('submit', (e) => {
    console.log('ditekan');
    e.preventDefault();
    const storeName = document.querySelector('#storeName').value;
    const description = document.querySelector('#description').value;
    const owner = document.querySelector('#owner').value;
    const contact = document.querySelector('#contact').value;

    createStore(storeName, description, owner, contact);
  });
}
if (updateStoreForm) {
  updateStoreForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('ditekan');
    const id = document.querySelector('#id').value;
    const storeName = document.querySelector('#storeName').value;
    const description = document.querySelector('#description').value;
    const owner = document.querySelector('#owner').value;
    const contact = document.querySelector('#contact').value;

    updateStore(id, storeName, description, owner, contact);
  });
}

const createStore = async (storeName, description, owner, contact) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:3000/api/v1/store`,
      data: {
        storeName: storeName,
        description: description,
        owner: owner,
        contact: contact,
      },
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
const updateStore = async (id, storeName, description, owner, contact) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/store/${id}`,
      data: {
        storeName: storeName,
        description: description,
        owner: owner,
        contact: contact,
      },
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
