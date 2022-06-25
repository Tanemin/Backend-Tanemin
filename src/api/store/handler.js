/* eslint-disable consistent-return */
const multer = require('multer');
const fs = require('fs');
const AppError = require('../../exceptions/app-error');
const APIFeatures = require('../../utils/api-features');
const Store = require('./validator');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/stores');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    // if (req.params.id) {
    cb(null, `store-${Date.now()}-cover.${ext}`);
    // }
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('No Images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadStorePhoto = upload.single('imageCover');

const getAllStore = async (req, res, next) => {
  try {
    const store = Store.find();
    if (!req.query.fields) {
      store.select('storeName description imageCover owner ratingStore');
    }
    const features = new APIFeatures(store, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // .search();

    const stores = await features.query;

    res.status(200).json({
      status: 'success',
      total: stores.length,
      result: stores,
    });
  } catch (error) {
    next(error);
  }
};

const createStore = async (req, res, next) => {
  try {
    if (req.file) req.body.imageCover = req.file.filename;
    const newStore = await Store.create(req.body);

    res.status(200).json({
      status: 'success',
      result: newStore,
    });
  } catch (error) {
    next(error);
  }
};

const getStoreById = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id).populate({
      path: 'plants',
      select: 'plantName imageCover tags ratingsAverage sold',
    });

    if (!store) {
      return next(new AppError('No Store found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: store,
    });
  } catch (error) {
    next(error);
  }
};

const updateStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldStore = await Store.findById(id);
    if (req.file) {
      if (oldStore.imageCover !== 'default.jpg') {
        fs.unlinkSync(`public/img/stores/${oldStore.imageCover}`);
      }
      req.body.imageCover = req.file.filename;
    } else {
      req.body.imageCover = oldStore.imageCover;
    }

    req.body.updatedAt = Date.now();
    const newStore = await Store.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newStore) {
      return next(new AppError('No Store found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newStore,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldStore = await Store.findById(id);
    if (oldStore.imageCover !== 'default.jpg') {
      fs.unlinkSync(`public/img/stores/${oldStore.imageCover}`);
    }
    const store = await Store.findByIdAndDelete(id);

    if (!store) {
      return next(new AppError('No Store found with that ID', 404));
    }

    if (!store) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: store,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStore,
  createStore,
  uploadStorePhoto,
  getStoreById,
  updateStoreById,
  deleteStoreById,
};
