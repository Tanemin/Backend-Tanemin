/* eslint-disable consistent-return */
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../../exceptions/app-error');
const APIFeatures = require('../../utils/api-features');
const Plant = require('./validator');

const multerStorage = multer.memoryStorage();

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

const uploadPlantImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'imageGalery', maxCount: 6 },
]);

const resizePlantImages = async (req, res, next) => {
  try {
    if (!req.files.imageCover) return next();

    req.body.imageCover = `plant-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/plants/${req.body.imageCover}`);

    if (!req.files.imageGalery) return next();
    req.body.imageGalery = [];
    await Promise.all(
      req.files.imageGalery.map(async (file, i) => {
        const filename = `plantGalery-${Date.now()}-${i + 1}.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/plants/${filename}`);

        req.body.imageGalery.push(filename);
      }),
    );

    next();
  } catch (err) {
    next(err);
  }
};

const getAllPlants = async (req, res, next) => {
  try {
    const plant = Plant.find();
    if (!req.query.fields) {
      plant
        .select(
          'plantName price store imageCover stock ratingsAverage ratingsQuantity sold searchCount viewCount',
        )
        .populate({
          path: 'store',
          select: 'storeName owner ratingStore imageCover',
        });
    }
    const features = new APIFeatures(plant, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .search();

    const plants = await features.query;

    if (req.query.search && plants.length > 0) {
      await Plant.updateMany(
        {
          searchQuery: { $regex: new RegExp(`.*${req.query.search}.*`) },
        },
        {
          $inc: { searchCount: 1 },
        },
        {
          new: true,
          runValidators: true,
        },
      );
    }

    res.status(200).json({
      status: 'success',
      total: plants.length,
      result: plants,
    });
  } catch (error) {
    next(error);
  }
};

const createPlant = async (req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body);

    res.status(200).json({
      status: 'success',
      result: newPlant,
    });
  } catch (error) {
    next(error);
  }
};

const getPlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id)
      .populate('reviews')
      .populate({
        path: 'store',
        select: 'storeName owner ratingStore imageCover',
      });

    if (!plant) {
      return next(new AppError('No Plant found with that ID', 404));
    }
    await Plant.updateMany(
      {
        _id: req.params.id,
      },
      {
        $inc: { viewCount: 1 },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      result: plant,
    });
  } catch (error) {
    next(error);
  }
};

const UpdatePlantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const oldPlant = await Plant.findById(id);

    req.body.updatedAt = Date.now();
    const newPlant = await Plant.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newPlant) {
      return next(new AppError('No Plant found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      result: newPlant,
    });
  } catch (error) {
    next(error);
  }
};
const deletePlantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const plant = await Plant.findByIdAndDelete(id);

    if (!plant) {
      return next(new AppError('No Plant found with that ID', 404));
    }

    if (!plant) {
      res.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    res.status(204).json({
      status: 'success',
      result: plant,
    });
  } catch (error) {
    next(error);
  }
};

const aliasTopPlant = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,-sold,-ratingsQuantity,-stock';
  next();
};

const aliasTopSearch = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-searchCount';
  next();
};
const aliasTopView = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-viewCount';
  next();
};
module.exports = {
  getAllPlants,
  createPlant,
  getPlantById,
  UpdatePlantById,
  deletePlantById,
  aliasTopPlant,
  aliasTopSearch,
  aliasTopView,
  uploadPlantImages,
  resizePlantImages,
};
