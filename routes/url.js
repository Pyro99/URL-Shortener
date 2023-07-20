const express = require('express');
const router = express.Router();

const {
  handleCreateShortURL,
  handleRedirectURL,
  handleAnalyticsData,
} = require('../controllers/url.js');

router.post('/', handleCreateShortURL);

router.get('/:shortId', handleRedirectURL);

router.get('/analytics/:shortId', handleAnalyticsData);

module.exports = router;
