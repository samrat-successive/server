// import { createBook, deleteBook, updateBook } from "../controllers/BookController"
import axios from 'axios';
import { ApolloError } from "apollo-server";

const APP_URL = 'http://localhost:5001';

/**
 * @description holds book mutations
 */

export const BookMutation = {
  createBook: {
    resolve: async (parent, args, context, info) => {
      let { name, description, author, price } = args.input;
      const formData = {
        name,
        description,
        author,
        price
      };
      const response = await axios.post(APP_URL + '/book/create', formData, context).then(res => {
        // do good things
        return res.data;
      }).catch(err => {
        if (err.response) {
          throw new ApolloError(err.response.data.message, err.response.status);
          // client received an error response (5xx, 4xx)
        }
      });

      return response.book;
    },
  },
  updateBook: {
    resolve: async (parent, args, context, info) => {
      let { id, name, description, author, price } = args.input;
      const formData = {
        id,
        name,
        description,
        author,
        price
      };
      const response = await axios.post(APP_URL + '/book/update', formData, context).then(res => {
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
  deleteBook: {
    resolve: async (parent, args, context, info) => {
      let id = args.id;
      const formdata = {
        id
      };
      const response = await axios.post(APP_URL + '/book/delete', formdata, context).then(res => {
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