import mongoose from "mongoose";

export const db = () => mongoose.connect(process.env.DATABASE_URL);
