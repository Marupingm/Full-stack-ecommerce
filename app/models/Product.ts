import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Teens']
  },
  images: {
    type: [String],
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
    validate: {
      validator: function(v: string[]) {
        return v.length > 0;
      },
      message: 'At least one size is required'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt field on save
ProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product; 