// module.exports = {
const getMovies = () => {
  return fetch('/api/movies')
      .then(response => response.json());
};
// };

const addMovie = (title, rating, genre) => {

  const newMovie = {title: title, genre: genre, rating: rating, id: "x"};
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