export const ratingSchema = `
    type Rating {
        id:ID
        movieId: String
        userId: String
        ageGroup: String
        rate: Number
        gender: String
        createdAt:Date
        updatedAt:Date
    }
   input ratingInput {
        id:ID
        movieId: String
        ageGroup: String
        rate: Number
   }
    extend type Query {
        getAllRating(id:ID,movieId:String):[Rating]
        ratingDiversion(movieId:ID):JSON
    }
    extend type Mutation {
        addRating(input:ratingInput):Rating 
        updateRating(input:ratingInput):Rating 
        deleteRating:Boolean
    }
`;
