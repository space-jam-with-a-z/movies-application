const getMovies = () => {
  return fetch('/api/movies')
      .then(response => response.json());
};

const addMovie = (title, rating, genre, img) => {
  const newMovie = {title: title, rating: rating, genre: genre, img: 'img/default.jpg'};
  const url = '/api/movies';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovie),
  };

  fetch(url, options)
      .then(/* post was created successfully */)
      .catch(/* handle errors */);
};

const deletingMovie = id => {
  const url = '/api/movies';
  const options = {
    method: 'DELETE',
  };

  fetch(url + "/" + id, options)
      .then(() => "A movie was deleted.")
      .catch(() => "A movie wasn't deleted.");
};

const editMovie = (title, rating, genre, img, id) => {
  const edittedMovie = {title: title, rating: rating, genre: genre, img: img};
  const url = '/api/movies';
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(edittedMovie),
  };

  fetch(url + "/" + id, options)
      .then(() => "A movie was changed.")
      .catch(() => "A movie wasn't changed.");
};

export default {
  addMovie,
  getMovies,
  deletingMovie,
  editMovie};