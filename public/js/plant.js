/* eslint-disable  */
const addPlantForm = document.querySelector('#addPlantForm');
const updatePlantForm = document.querySelector('#updatePlantForm');

const typeValue = () => {
  const type = [];
  type.push(
    `${
      document.querySelector('#cbIndoor:checked')
        ? document.querySelector('#cbIndoor:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbOutdoor:checked')
        ? document.querySelector('#cbOutdoor:checked').value
        : 'null'
    }`,
  );
  const newType = type.filter((tag) => tag !== 'null');
  return newType;
};
const seasonValue = () => {
  const seasons = [];
  seasons.push(
    `${
      document.querySelector('#cbMusimHujan:checked')
        ? document.querySelector('#cbMusimHujan:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbMusimPanas:checked')
        ? document.querySelector('#cbMusimPanas:checked').value
        : 'null'
    }`,
  );
  const newSeason = seasons.filter((tag) => tag !== 'null');
  return newSeason;
};
const habitatValue = () => {
  const habitat = [];
  habitat.push(
    `${
      document.querySelector('#cbHutan:checked')
        ? document.querySelector('#cbHutan:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbPenghujungSungai:checked')
        ? document.querySelector('#cbPenghujungSungai:checked').value
        : 'null'
    }`,
  );
  const newHabitat = habitat.filter((tag) => tag !== 'null');
  return newHabitat;
};

const tagsValue = () => {
  const tags = [];
  tags.push(
    `${
      document.querySelector('#cbMusiman:checked')
        ? document.querySelector('#cbMusiman:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbHiasanRuangan:checked')
        ? document.querySelector('#cbHiasanRuangan:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbPerairan:checked')
        ? document.querySelector('#cbPerairan:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbDaratan:checked')
        ? document.querySelector('#cbDaratan:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbGurun:checked')
        ? document.querySelector('#cbGurun:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbHiasanLuarRuangan:checked')
        ? document.querySelector('#cbHiasanLuarRuangan:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbHobby:checked')
        ? document.querySelector('#cbHobby:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbKoleksi:checked')
        ? document.querySelector('#cbKoleksi:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbPameran:checked')
        ? document.querySelector('#cbPameran:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbLangka:checked')
        ? document.querySelector('#cbLangka:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbTanamanGantung:checked')
        ? document.querySelector('#cbTanamanGantung:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbTanamanHiasPohon:checked')
        ? document.querySelector('#cbTanamanHiasPohon:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbTanamanHiasBunga:checked')
        ? document.querySelector('#cbTanamanHiasBunga:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbTanamanHiasDaun:checked')
        ? document.querySelector('#cbTanamanHiasDaun:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbTanamanHiasBuah:checked')
        ? document.querySelector('#cbTanamanHiasBuah:checked').value
        : 'null'
    }`,
    `${
      document.querySelector('#cbTanamanHiasAkar:checked')
        ? document.querySelector('#cbTanamanHiasAkar:checked').value
        : 'null'
    }`,
  );
  const newTag = tags.filter((tag) => tag !== 'null');
  return newTag;
};

if (addPlantForm) {
  addPlantForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tags = tagsValue();
    const habitats = habitatValue();
    const types = typeValue();
    const seasons = seasonValue();
    const store = document.querySelector('#selectStore').value;
    const difficulty = document.querySelector('#selectDifficulty').value;
    const image1 = document.querySelector('#image1').files[0];
    const image2 = document.querySelector('#image2').files[0];
    const image3 = document.querySelector('#image3').files[0];
    const image4 = document.querySelector('#image4').files[0];
    const image5 = document.querySelector('#image5').files[0];
    const image6 = document.querySelector('#image6').files[0];

    const form = new FormData();
    form.append('plantName', document.querySelector('#plantName').value);
    form.append('description', document.querySelector('#description').value);
    form.append('store', store);
    form.append('difficulty', difficulty);
    form.append('price', document.querySelector('#price').value);
    form.append('stock', document.querySelector('#stock').value);
    form.append('height', document.querySelector('#height').value);
    form.append('diameter', document.querySelector('#diameter').value);
    form.append('duration', document.querySelector('#duration').value);
    // form.append('type', types);
    // form.append('season', seasons);
    // form.append('habitat', habitats);
    tags.forEach((el) => {
      form.append('tags', el);
    });
    types.forEach((el) => {
      form.append('type', el);
    });
    seasons.forEach((el) => {
      form.append('season', el);
    });
    habitats.forEach((el) => {
      form.append('habitat', el);
    });
    // form.append('tags', tag);
    form.append('imageCover', document.querySelector('#imageCover').files[0]);
    if (image1) form.append('imageGalery', image1);
    if (image2) form.append('imageGalery', image2);
    if (image3) form.append('imageGalery', image3);
    if (image4) form.append('imageGalery', image4);
    if (image5) form.append('imageGalery', image5);
    if (image6) form.append('imageGalery', image6);
    createPlant(form, 'data');
  });
}
if (updatePlantForm) {
  updatePlantForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const tags = tagsValue();
    const habitats = habitatValue();
    const types = typeValue();
    const seasons = seasonValue();
    const store = document.querySelector('#selectStore').value;
    const difficulty = document.querySelector('#selectDifficulty').value;
    const image1 = document.querySelector('#image1').files[0];
    const image2 = document.querySelector('#image2').files[0];
    const image3 = document.querySelector('#image3').files[0];
    const image4 = document.querySelector('#image4').files[0];
    const image5 = document.querySelector('#image5').files[0];
    const image6 = document.querySelector('#image6').files[0];
    const id = document.querySelector('#id').value;
    const form = new FormData();
    form.append('plantName', document.querySelector('#plantName').value);
    form.append('description', document.querySelector('#description').value);
    form.append('store', store);
    form.append('difficulty', difficulty);
    form.append('price', document.querySelector('#price').value);
    form.append('stock', document.querySelector('#stock').value);
    form.append('height', document.querySelector('#height').value);
    form.append('diameter', document.querySelector('#diameter').value);
    form.append('duration', document.querySelector('#duration').value);
    tags.forEach((el) => {
      form.append('tags', el);
    });
    types.forEach((el) => {
      form.append('type', el);
    });
    seasons.forEach((el) => {
      form.append('season', el);
    });
    habitats.forEach((el) => {
      form.append('habitat', el);
    });
    if (document.querySelector('#imageCover').files[0])
      form.append('imageCover', document.querySelector('#imageCover').files[0]);
    if (image1) form.append('imageGalery', image1);
    if (image2) form.append('imageGalery', image2);
    if (image3) form.append('imageGalery', image3);
    if (image4) form.append('imageGalery', image4);
    if (image5) form.append('imageGalery', image5);
    if (image6) form.append('imageGalery', image6);
    updatePlant(id, form);
  });
}

const createPlant = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `https://tanemin.herokuapp.com/api/v1/plants`,
      data,
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/plants');
      }, 1000);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
const updatePlant = async (id, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/plants/${id}`,
      data,
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/plants');
      }, 1000);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
