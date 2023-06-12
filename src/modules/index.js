import gql from "graphql-tag";
import { User, userSchema, userQuery, userMutation } from "./user";
import { Movie, movieSchema, movieQuery, movieMutation } from "./movie";
import { Rating, ratingSchema, ratingQuery, ratingMutation } from "./rating";

export const models = {
  User,
  Movie,
  Rating,
};

export const typeDefs = gql`
   	scalar Date
	scalar JSON
	scalar Number

    type Query
    type Mutation
    
    input Sort {
      key: String
      type: Int
    }

    enum Gender {
        MALE
        FEMALE
    }
 
     ${userSchema}
     ${movieSchema}
     ${ratingSchema}
`;

export const resolvers = {
  Query: {
    ...userQuery,
    ...movieQuery,
    ...ratingQuery,
  },
  Mutation: {
    ...userMutation,
    ...movieMutation,
    ...ratingMutation,
  },
};
