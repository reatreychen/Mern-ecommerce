const mongoose = require('mongoose')
const productSchema =new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subcategory",
      },
    ],
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    public: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create th text index
productSchema.index({
  name: "text",
  description: 'text'
}, {
  weights: {
    name: 10,
    description: 5
  }
});

const product = mongoose.model("product", productSchema);

module.exports = product;
