export const movieSchema = `
    type Movie {
        id:ID
        name: String
        description: String
        poster: String
        genre: [String]
        totalRating: Number
        votes: Number
        rating: Number
        director: String
        # OTTPlatForm: [String]
        year: Date
        createdAt:Date
        updatedAt:Date
    }
   input movieInput {
        id:ID
        name: String
        description: String
        poster: String
        genre: [String]
        # totalRating: Number
        # votes: Number
        # rating: Number
        director: String
        # OTTPlatForm: [String]
        year: Date
   }
   type MoviePaginate {
    count: Int
    data: [Movie]
}
    extend type Query {
        getAllMovie(page: Int, limit: Int, sort: Sort, filter:String,search: String,top:Boolean,worst:Boolean):MoviePaginate
    }
    extend type Mutation {
        addMovie(input:movieInput):Movie 
        updateMovie(input:movieInput):Movie 
        deleteMovie(id:ID):Boolean
    }
`;
