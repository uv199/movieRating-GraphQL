import { combineResolvers } from "graphql-resolvers";
import { isAuthentication, isAdmin } from "../../authentication";
import mongoose from "mongoose";

export const ratingQuery = {
  getAllRating: combineResolvers(isAuthentication, (parent, { id, movieId }, { models, me }) => {
    console.log("me: ", me);
    let filter = { ...(id && { _id: id }) };
    if (movieId) filter = { userId: me?.id, movieId };
    console.log("filter: ", filter);
    return new Promise(async (resolve, reject) => {
      models.Rating.find(filter)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }),
  ratingDiversion: combineResolvers(isAuthentication, (parent, { movieId }, { models, me }) => {
    return new Promise(async (resolve, reject) => {
      models.Rating.aggregate([
        {
          $match: { movieId: new mongoose.Types.ObjectId(movieId) },
        },
        {
          $group: {
            _id: { x: "$rate" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: "$_id.x",
            count: "$count",
          },
        },
      ])
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }),
};

export const ratingMutation = {
  addRating: combineResolvers(isAuthentication, async (parent, { input }, { models, me }) => {
    input.userId = me?.id;
    input.gender = me?.gender;
    // console.log("input: ", input);
    return new Promise((resolve, reject) => {
      models.Rating.create(input)
        .then(async (res) => {
          resolve(res);
          const movieData = await models.Movie.findById(res.movieId);
          movieData.votes++;
          movieData.totalRating += input?.rate;
          movieData.rating = (movieData?.totalRating / movieData.votes).toFixed(2);
          console.log("movieData: ", movieData);
          await movieData.save();
          console.log("movieData: ", movieData);
        })
        .catch((err) => reject(err));
    });
  }),

  updateRating: combineResolvers(isAuthentication, async (parent, { input }, { models, me }) => {
    console.log('me: ', me.id);
    console.log("input: ", input);
    return new Promise((resolve, reject) => {
      models.Rating.findOneAndUpdate({ _id: input?.id, userId: me?.id }, input)
        .then(async (res) => {
          console.log('res: ', res);
          resolve(res);
          const movieData = await models.Movie.findById(res.movieId);
          movieData.totalRating -= res?.rate || 0;
          movieData.totalRating += input?.rate || 0;
          movieData.rating = (movieData?.totalRating / movieData.votes).toFixed(2);
          await movieData.save();
        })
        .catch((err) => reject(err));
    });
  }),

  deleteRating: combineResolvers(isAuthentication, async (parent, { id }, { models, me }) => {
    return new Promise((resolve, reject) => {
      models.Rating.findOneAndDelete({ id, userId: me?.id }, async (err, res) => {
        console.log('res: ', res);
        if (err) return reject(err);
        else {
          resolve(true);
          const movieData = await models.Movie.findById(res.movieId);
          movieData.totalRating -= rating?.rate || 0;
          movieData.votes--;
          movieData.rating = (movieData?.totalRating / movieData.votes).toFixed(2);
          await movieData.save();
        }
      });
    });
  }),
};
