import { createUser, deleteUser, updateUser, signInUser } from "../controllers/UserController"
import axios from 'axios';
import { ApolloError } from "apollo-server";
/**
 * @description holds user mutations
 */
const APP_URL = 'http://localhost:5001'
const config = {
  headers: {
    'Content-Type': "application/json"
  }
};
export const UserMutation = {
  createUser: {
    resolve: async (parent, args, context, info) => {
      let { name, email, password } = args.input;
      const formData = {
        name,
        email,
        password
      };
      const response = await axios.post(APP_URL + '/user/signup', formData, config).then(res => {
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
  },
  updateUser: {
    resolve: async (parent, args, context, info) => {
      return await updateUser(context.dbConn, args.input);
    },
  },
  deleteUser: {
    resolve: async (parent, args, context, info) => {
      return await deleteUser(context.dbConn, args.id);
    },
  },
  signInUser: {
    resolve: async (parent, args, context, info) => {
      let { email, password } = args.input;
      const formData = {
        email,
        password
      };

      const response = await axios.post(APP_URL + '/user/login', formData, config).then(res => {
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
  },
}