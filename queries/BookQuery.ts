import { getAllBooks, getBook } from "../controllers/BookController";

import axios from 'axios';
import { ApolloError } from "apollo-server";

const APP_URL = 'http://localhost:5001';

/**
 * @description holds book queries
 */

export const BookQuery = {
  books: {
    resolve: async (parent, args, context, info) => {
      const response = await axios.get(APP_URL + '/book/all', context).then(res => {
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
  book: {
    resolve: async (parent, args, context, info) => {
      let id = args.id;
      const formdata = {
        id
      };
      const response = await axios.post(APP_URL + '/book/get', formdata, context).then(res => {
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