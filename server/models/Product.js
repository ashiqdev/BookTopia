const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      default: '1',
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({
  name: 'text',
});

module.exports = mongoose.model('Product', productSchema);
