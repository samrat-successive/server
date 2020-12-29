import { getAllUsers, getUser } from "../controllers/UserController";
import axios from 'axios';
import { ApolloError } from "apollo-server";

/**
 * @description holds user queries
 */
const APP_URL = 'http://localhost:5001';

export const UserQuery = {
  users: {
    resolve: async (parent, args, context, info) => {
      return await getAllUsers(context.dbConn)
    },
  },
  user: {
    resolve: async (parent, args, context, info) => {
      return await getUser(context.dbConn, args.id)
    },
  },
  me: {
    resolve: async (parent, args, context, info) => {
      const response = await axios.get(APP_URL + '/user/me', context).then(res => {
        // do good things
        return res.data;
      }).catch(err => {
        if (err.response) {
          throw new ApolloError(err.response.data.message, err.response.status);
          // client received an error response (5xx, 4xx)
        }
      });
      return response;
    },
  }
}