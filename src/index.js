/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');



getMovies().then((movies) => {

  console.log('Here are all the movies:');

  let html = `<div class="row">`;

  movies.forEach(({title, rating, id, img}) => {

    console.log(img);

    html += `<p class='col-sm-6 col-3-md movies' style='background-image: url(' + img + ")'  >` + `id#${id} - ${title} - rating: ${rating}` + "</p>";

  });

  $(".container").html(html + "</div>");

}).catch((error) => {

  alert('Oh no! Something went wrong.\nCheck the console for details.')

  console.log(error);

});
