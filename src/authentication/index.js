import { combineResolvers, skip } from "graphql-resolvers";
import { GraphQLError } from "graphql";
import { models } from "../modules";
const jwt = require("jsonwebtoken");

export const isAuthentication = (parents, args, { me }) => {
  return me ? skip : new GraphQLError("you are not authenticated", { extensions: { code: "UNAUTHENTICATED" } });
};

export const isAdmin = combineResolvers(isAuthentication, (parents, args, { me: { userType } }) => {
  return userType === "Admin" ? skip : new GraphQLError("you are not Admin", { extensions: { code: "UNAUTHENTICATED" } });
});

const getUserFromToken = async (req) => {
  const token = req.headers["x-token"];
  if (!token) throw new Error("Session Invalid or expired. ");
  const me = await jwt.verify(token, process.env.SECRET);
  const user = await models.User.findById(me.id);
  if (!user) throw new Error("Session Invalid or expired. ");
  return user;
};

export const authentication = async (req, res, next) => {
  try {
    req.me = await getUserFromToken(req);
    return next();
  } catch (e) {
    return res.status(401).send({ error: e.message });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req);
    if (user.userType !== "Admin") throw new Error("You are not Admin");
    req.me = user;
    return next();
  } catch (e) {
    return res.status(401).send({ error: error.message });
  }
};
