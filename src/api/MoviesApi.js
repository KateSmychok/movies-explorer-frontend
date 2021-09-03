const getAllMovies = () => fetch('https://api.nomoreparties.co/beatfilm-movies', {
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  })
  .catch((err) => {
    console.log(err);
  });

export default getAllMovies;
