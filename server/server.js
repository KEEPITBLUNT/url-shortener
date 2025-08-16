const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');
require('dotenv').config();

const URL = require('./models/URL');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// POST /api/shorten - Create short URL
app.post('/api/shorten', async (req, res) => {
  try {
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Generate unique short code
    let short_code;
    let existingURL;
    do {
      short_code = shortid.generate();
      existingURL = await URL.findOne({ short_code });
    } while (existingURL);

    // Save new URL
    const newURL = new URL({ original_url, short_code, clicks: 0 });
    await newURL.save();

    const baseURL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5001}`;
    const short_url = `${baseURL}/${short_code}`;

    res.json({ original_url, short_url, short_code });

  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admin - Analytics (must be **before** dynamic shortCode route)
app.get('/api/admin', async (req, res) => {
  try {
    const urls = await URL.find()
      .sort({ createdAt: -1 })
      .select('original_url short_code clicks createdAt updatedAt');

    const baseURL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5001}`;
    const urlsWithShortURL = urls.map(url => ({
      ...url.toObject(),
      short_url: `${baseURL}/${url.short_code}`
    }));

    res.json(urlsWithShortURL);

  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/:shortCode - Redirect to original URL
app.get('/api/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await URL.findOne({ short_code: shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();

    res.json({ original_url: url.original_url });
  } catch (error) {
    console.error('Error fetching original URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});