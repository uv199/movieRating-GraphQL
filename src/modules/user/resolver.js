import { combineResolvers } from "graphql-resolvers";
import { isAuthentication, isAdmin } from "../../authentication";
import jwt from "jsonwebtoken";
import { fileUpload } from "../../functions/fileUpload";
import { GraphQLError } from "graphql";
import fetch from "node-fetch";
import { User } from "./model";

const generateToken = (user, expiresIn) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn });
};

export const userQuery = {
  getAllUser: (parent, _, { models, me }) => {
    return new Promise(async (resolve, reject) => {
      console.log("-------=======-------=======----->");
      User.find({})
        .then((res) => {
          // console.log("res: ", res);

          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  
  internalCall: () => {
    return new Promise(async (resolve, reject) => {
      fetch("http://localhost:4444/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{   getAllUser {
          id
          firstName
        }  }`,
        }),
      })
        .then((response) => {
          console.log("response: ", response.ok);
          if (!response.ok) {
            throw new Error(`GraphQL request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          resolve(data.data.getAllUser);
        })
        .catch((e) => {
          console.log("Error response: ", e);
          reject(e);
        });
    });
  },
};

export const userMutation = {
  signUp: async (parent, { input }, { models }) => {
    // console.log("input: ", input);
    return new Promise(async (resolve, reject) => {
      models.User.create(input)
        .then((res) => {
          console.log("res: ", res);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  signIn: async (parent, { email, password }, { models }) => {
    const user = await models.User.findOne({ email });
    if (!user) throw new GraphQLError("Please enter valid email or userName", { extensions: { code: "BAD_USER_INPUT" } });
    if (!user.isVerified) throw new GraphQLError("Please verify your email", { extensions: { code: "BAD_USER_INPUT" } });
    if (!(await user.validatePassword(password)))
      throw new GraphQLError("Invalid password or userName", { extensions: { code: "BAD_USER_INPUT" } });
    return {
      token: generateToken(user, "8h"),
      user: user,
    };
  },

  updateUser: combineResolvers(isAuthentication, async (parent, args, { models, me }) => {
    return new Promise((resolve, reject) => {
      models.User.findByIdAndUpdate(me?.id, input)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }),

  deleteUser: combineResolvers(isAuthentication, async (parent, args, { models, me }) => {
    return new Promise((resolve, reject) => {
      models.User.findByIdAndRemove(me?.id)
        .then((res) => resolve(true))
        .catch((err) => reject(err));
    });
  }),

  verifyEmail: async (parent, { email }, { models }) => {
    return new Promise(async (resolve, reject) => {
      models.User.findOneAndUpdate({ email }, { isVerified: true })
        .then((res) => resolve(true))
        .catch((err) => reject(err));
    });
  },

  fileUpload: combineResolvers(isAuthentication, (parent, { img }, { models, me }) => {
    return new Promise(async (resolve, reject) => {
      const file = await fileUpload(img);
      if (file) resolve(file);
      else reject(false);
    });
  }),
};
