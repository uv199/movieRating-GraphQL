import { combineResolvers } from "graphql-resolvers";
import { isAuthentication, isAdmin } from "../../authentication";
import { FilterQuery } from "../../functions/filterquery";

export const movieQuery = {
  // note - for get top 10 pass do des.. sort on rate key and for worst 10 movie do revers

  getAllMovie: (parent, args, { models, me }) => {
    const filterText = FilterQuery(args?.search, "movieTable");
    let filter = JSON.parse(args?.filter);
    // const sort = [["vote", -1],["rating", -1],];
    const sort = { [args?.sort?.key]: args?.sort?.type };
    const option = {
      page: args?.page,
      limit: args?.limit,
      sort,
      populate: [],
    };
    console.log("option: ", option);
    return new Promise(async (resolve, reject) => {
      filter = { ...filter, ...filterText };
      if (args?.top || args?.worst) filter = { ...filter, votes: { $gte: 500 } };
      console.log('filter: ', filter);
      models.Movie.paginate(filter, option)
        .then((res) => resolve({ count: res.total, data: res?.docs }))
        .catch((err) => reject(err));
    });
  },
};

export const movieMutation = {
  addMovie: combineResolvers(isAdmin, async (parent, { input }, { models, me }) => {
    return new Promise((resolve, reject) => {
      models.Movie.create(input)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }),

  updateMovie: combineResolvers(isAdmin, async (parent, { input }, { models, me }) => {
    console.log("input: ", input);
    return new Promise((resolve, reject) => {
      models.Movie.findByIdAndUpdate(input?.id, input, { new: true })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }),

  deleteMovie: combineResolvers(isAdmin, async (parent, { id }, { models, me }) => {
    return new Promise((resolve, reject) => {
      models.Movie.findByIdAndRemove(id)
        .then((res) => resolve(true))
        .catch((err) => reject(false));
    });
  }),
};
