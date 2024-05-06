const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoose succsess");
  } catch (error) {
    console.log("succeess");
  }
};
