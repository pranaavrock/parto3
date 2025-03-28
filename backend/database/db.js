// import mongoose from "mongoose";

// export const connectDb = async () => {
//   try {
//     require('dotenv').config();
//     console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging

//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Database Connected");
//   } 
//   catch (error) {
//     console.log(error);
//   }
// };

import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
    
  }
  catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
}
};

// const mongoose = require("mongoose");
// require("dotenv").config();

// async function connectDb() {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error("MongoDB Connection Error:", error);
//         process.exit(1);
//     }
// }

// module.exports = connectDb;
