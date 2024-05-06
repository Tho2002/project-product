const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const bikelistSchema = new mongoose.Schema(
  {
    title: String,
    product_category_id: {
      type: String,
      default: "",
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    featured: String,
    stock: Number,
    position: Number,
    category: String,
    thumbnail: String,
    status: String,
    slug: { type: String, slug: "title", unique: true },
    createBy: {
      account_id: String,
      createAt: {
        type: Date,
        default: Date.now,
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

const Bikelist = mongoose.model("Bikelist", bikelistSchema, "bikelist");
module.exports = Bikelist;
