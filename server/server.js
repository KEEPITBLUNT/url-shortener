const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');
require('dotenv').config();

const URL = require('./models/URL');

const app = express();


app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes

// POST /api/shorten - Create short URL
app.post('/api/shorten', async (req, res) => {
  try {
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Generate unique 
    let short_code;
    let existingURL;
    
    do {
      short_code = shortid.generate();
      existingURL = await URL.findOne({ short_code });
    } while (existingURL);

    // Create new URL document
    const newURL = new URL({
      original_url,
      short_code,
      clicks: 0
    });

    await newURL.save();

    const short_url = `${process.env.BASE_URL}/${short_code}`;

    res.json({
      original_url,
      short_url,
      short_code
    });

  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:shortcode - Redirect to original URL
app.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;

    const url = await URL.findOne({ short_code: shortcode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count
    url.clicks += 1;
    await url.save();

    // Redirect to original URL
    res.redirect(url.original_url);

  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admin - Get all URLs with analytics
app.get('/api/admin', async (req, res) => {
  try {
    const urls = await URL.find()
      .sort({ createdAt: -1 })
      .select('original_url short_code clicks createdAt updatedAt');

    const urlsWithShortURL = urls.map(url => ({
      ...url.toObject(),
      short_url: `${process.env.BASE_URL}/${url.short_code}`
    }));

    res.json(urlsWithShortURL);

  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
