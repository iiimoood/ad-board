const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getById);
router.post(
  '/ads',
  authMiddleware,
  imageUpload.single('photo'),
  AdController.postNew
);
router.put(
  '/ads/:id',
  authMiddleware,
  imageUpload.single('photo'),
  AdController.putChanged
);
router.delete('/ads/:id', authMiddleware, AdController.deleteById);
router.get('/ads/search/:searchPhrase', AdController.getBySearchPhrase);

module.exports = router;
