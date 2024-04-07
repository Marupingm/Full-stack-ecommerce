import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      enum: {
        values: ['Men', 'Women', 'Teens'],
        message: '{VALUE} is not a valid category',
      },
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one product image'],
      validate: {
        validator: function(v: string[]) {
          return v.length > 0;
        },
        message: 'At least one image is required'
      }
    },
    sizes: {
      type: [String],
      required: [true, 'Please provide at least one size'],
      validate: {
        validator: function(v: string[]) {
          return v.length > 0;
        },
        message: 'At least one size is required'
      }
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
productSchema.index({ category: 1, createdAt: -1 });

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product; // Modified on 2025-02-19 00:50:50
