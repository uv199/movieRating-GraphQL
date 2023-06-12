export const userSchema = `
    type User {
        id:ID
        firstName: String
        lastName: String
        photo: String
        address: String
        email: String
        password: String
        gender: String
        userType: String
        isVerified: Boolean
        createdAt: Date
        updatedAt: Date
    }
    input userInput {
        id:ID
        firstName: String
        lastName: String
        photo: String
        address: String
        email: String
        password: String
        gender: Gender
        # userType: String
    }

    type signInRes {
        token :String
        user:User
     }

    extend type Query {
        getAllUser:[User]
        internalCall:[User]
    }
    extend type Mutation {
        signUp(input:userInput):User
        signIn(email:String,password:String):signInRes
        updateUser(input:userInput):User
        verifyEmail(email:String):Boolean
        deleteUser:Boolean
        fileUpload(img:String):String
    }
`;
