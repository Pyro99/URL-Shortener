const URL = require('../models/url.js');
const shortid = require('shortid');

const handleCreateShortURL = async (req, res) => {
  if (!req.body.url) return res.status(400).json({ error: 'URL required' });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: req.body.url,
    visited: [],
    createdBy: req.user._id,
  });
  return res.render('home', {
    id: shortID,
  });
};

const handleRedirectURL = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  return res.redirect(entry.redirectURL);
};

const handleAnalyticsData = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
};

module.exports = {
  handleCreateShortURL,
  handleRedirectURL,
  handleAnalyticsData,
};
