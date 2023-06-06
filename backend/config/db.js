import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `mongodb connection established ${connection.connection.host}`.cyan
        .underline
    );
  } catch (e) {
    console.log(`Error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
