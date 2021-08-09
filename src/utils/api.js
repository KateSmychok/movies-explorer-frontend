import React from 'react';
import instance from './mock';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  if (res) {
    return res;
  }
  return Promise.reject(new Error('Произошла ошибка'));
}

function getMovies() {
  return instance.get('/movies', headers)
    .then((res) => checkResponse(res));
}

function getSavedMovies() {
  return instance.get('/saved-movies', headers)
    .then((res) => checkResponse(res));
}

export default {
  getMovies,
  getSavedMovies,
};
