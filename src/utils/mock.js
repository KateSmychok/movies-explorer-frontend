import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  getMovies,
  getSavedMovies
} from './mockResponses';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

const headers = { "Content-Type": "application/json" };

const mock = new MockAdapter(instance);

mock.onGet("/movies").reply(200, getMovies, headers);
mock.onGet("/saved-movies").reply(200, getSavedMovies, headers);

export default instance;
