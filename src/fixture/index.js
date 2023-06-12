import { models } from "../modules";
import { movieData } from "../utils/movieData.js";
import csvToJson from "convert-csv-to-json";
import fs from "fs";

export const addPreData = () => {
  addAdmin();
  addMovieData();
};

const addAdmin = async () => {
  const match = await models.User.findOne({ email: process.env.EMAIL });
  if (!match) {
    models.User.create({ email: process.env.EMAIL, password: process.env.PASSWORD, userType: "Admin", isVerified: true });
  }
};

const addMovieData = async () => {
  // const data = await csvToJson.parseSubArray("*", ",").getJsonFromCsv(__dirname + "/movieData.csv");
  // const abc = JSON.stringify(data);
  // fs.writeFile("movieData.js", abc, (err) => {
  //   if (err) console.log(err);
  //   else console.log("File written successfully\n");
  // });
  const count = await models.Movie.countDocuments();
  if (count <= 0) {
    models.Movie.create(movieData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log("data: ", movieData);
  }
};
