class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if (!res.ok) {
      return res.json().then((r) => Promise.reject(r));
    }
    return res.clone().json();
  };

  register = (name, email, password) => fetch(`${this._url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then(this._checkResponse);

  login = (email, password) => fetch(`${this._url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(this._checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    });

  getCurrentUser = (token) => fetch(`${this._url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(this._checkResponse);

  updateCurrentUser = (name, email) => fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name,
      email,
    }),
  })
    .then(this._checkResponse);

  getSavedMovies = () => fetch(`${this._url}/movies`, {
    method: 'GET',
    headers: this._headers,
  })
    .then(this._checkResponse);

  saveMovie = (
    nameRU,
    image,
    trailerLink,
    duration,
  ) => fetch(`${this._url}/movies`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      nameRU,
      image,
      trailerLink,
      duration,
    }),
  })
    .then(this._checkResponse);

  deleteMovieFromSaved = (movieId) => fetch(`${this._url}/movies/${movieId}`, {
    method: 'DELETE',
    headers: this._headers,
  })
    .then(this._checkResponse);
}

const api = new Api({
  url: 'https://api.even-star.nomoredomains.work',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;
