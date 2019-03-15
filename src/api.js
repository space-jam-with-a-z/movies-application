// module.exports = {
const getMovies = () => {
  return fetch('/api/movies')
      .then(response => response.json());
};
// };

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

export default {
  addMovie,
  getMovies};