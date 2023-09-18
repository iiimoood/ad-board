const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find({}).populate('seller'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('seller');
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const { title, content, dateOfPublication, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (
      title &&
      typeof title === 'string' &&
      content &&
      typeof content === 'string' &&
      dateOfPublication &&
      new Date(dateOfPublication) instanceof Date &&
      price &&
      typeof parseInt(price) === 'number' &&
      location &&
      typeof location === 'string' &&
      req.file &&
      ['image/png', 'image/jpg', 'image.jpeg'].includes(fileType)
    ) {
      const newAd = new Ad({
        title: title,
        content: content,
        dateOfPublication: dateOfPublication,
        photo: req.file.filename,
        price: price,
        location: location,
        seller: req.session.user.id,
      });
      await newAd.save();

      res.json({ message: 'OK' });
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    console.log(err);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: err });
  }
};

exports.putChanged = async (req, res) => {
  const { title, content, dateOfPublication, photo, price, location, seller } =
    req.body;

  try {
    const ad = await Ad.findById(req.params.id).populate('seller');

    if (ad) {
      const oldPhoto = ad.photo;

      ad.title = title;
      ad.content = content;
      ad.dateOfPublication = dateOfPublication;
      ad.photo = photo;
      ad.price = price;
      ad.location = location;
      ad.seller = seller;
      if (req.file) {
        ad.photo = req.file.filename;
        fs.unlinkSync(`./public/uploads/${oldPhoto}`);
      }
      const updatedAd = await ad.save();

      res.json({ message: 'OK', ad: updatedAd });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', ad: ad });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getBySearchPhrase = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    const ads = await Ad.find({
      $or: [
        { title: { $regex: searchPhrase, $options: 'i' } },
        { content: { $regex: searchPhrase, $options: 'i' } },
      ],
    }).populate('seller');
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
