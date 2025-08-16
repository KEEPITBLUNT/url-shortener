const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        try {
          new URL(v);
          return true;
        } catch (err) {
          return false;
        }
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  short_code: {
    type: String,
    required: true,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Export model
module.exports = mongoose.model('URL', urlSchema, 'urls');