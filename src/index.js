/**
 * es6 modules and imports
 */
import movies from './api.js';

// Declarations
let ratings;
let titles;
let genres;
let imgs;

// Fetch movie data from db.json and insert movie tiles //
function gettingMovies() {
  movies.getMovies().then((movies) => {
    console.log('Here are all the movies:');

    $('button').toggleClass("hide");
    $('h1').toggleClass("hide");
    $('h3').toggleClass("hide");

    let html = `<div class="row">`;
    movies.forEach(({title, rating, id, img, genre}) => {
      ratings = `${rating}`;
      titles = `${title}`;
      genres = `${genre}`;
      imgs = `${img}`;
      // console.log(`${rating}`);
      html += `
      <div class="col-sm-6 col-3-md movies" style="background-image: url(../${img})">
        <p>id#${id}</p>
        <p>${title}</p>
        <p>${genre}</p>
        <p>rating:${rating}</p>
      </div>`;
    });
    $(".inject-movies").html(html + "</div>");
  })
    .catch((error) => {
      console.warn('Inject moves went wrong.');
      console.log(error);
    });
}

///////////////////////// Rating Code ///////////////////////////

// Run get ratings when DOM loads
document.addEventListener('DOMContentLoaded', getRatings);

// Form Elements
const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');

// Init product
let product;

// Product select change
productSelect.addEventListener('change', (e) => {
  product = e.target.value;
  // Enable rating control
  ratingControl.disabled = false;
  ratingControl.value = ratings[product];
});

// Rating control change
ratingControl.addEventListener('blur', (e) => {
  // rating = e.target.value;
  // const rating = `${rating}`


  // Make sure 5 or under
  if(ratings > 5) {
    alert('Please rate 1-5');
    return;
  }

  // Change rating
  ratings[product] = ratings;

  getRatings();
});

// Total Stars
const starsTotal = 5;

// Get ratings // in loop for objects, of loop for array
function getRatings() {
  for(let rating in ratings) {

    console.log(ratings[rating]);

    const starPercentage = (ratings[rating] / starsTotal) * 100;

    // Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    // Set width of stars-inner to percentage
    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

    // Add number rating
    document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
  }
}
// Ratings object
function gettingRatings() {
  movies.getMovies().then((movies) => {
    let ratingTable = `<table class="table table-striped">`;
    movies.forEach(({title}) => {
      ratingTable += `
              <tbody>
                  <tr class="aladdin">
                      <td>${title}</td>
                      <td>
              <div class='stars-outer'>
                  <div class="stars-inner"></div>
              </div>
              <span class="number-rating"></span>
                      </td>
                  </tr>
                  <tr class="movies-table"></tr>
              </tbody></table></div>`
    });
    $(".movies-table").append(ratingTable);
  })
    .catch((error) => {
      console.warn('Ratings went wrong.');
      console.log(error);
    });
}

/////////////////////// End Ratings Code /////////////////////

// Call functions
gettingRatings();
gettingMovies();

// Add button function
$("#add").on("click", function(){

  let addTitle = $('#inputTitle').val();
  let addGenre = $('#inputGenre').val();
  let addRating = $('#inputRating').val();
  let addFile = $('#inputImg').val();

  console.warn(`The movie being added is:\n\nTitle: ${addTitle}\nGenre: ${addGenre}\nRating: ${addRating}`);

  movies.addMovie(addTitle, addGenre, addRating);

  $(".container").html("<p id='image'><img src='https://i.gifer.com/SjyG.gif' alt='loading'></p>");
  $('button').toggleClass("hide");
  $('h1').toggleClass("hide");
  $('h3').toggleClass("hide");

  gettingMovies();

});

// Delete button function
$(`#delete`).on("click", function () {
  let deleteID = prompt("Please enter the ID of the movie you want to delete.");
  movies.deletingMovie(deleteID);
  $(".container").html("<p id='image'><img src='https://i.gifer.com/SjyG.gif' alt='loading'></p>");
  $('button').toggleClass("hide");
  $('input').toggleClass("hide");
  $('h1').toggleClass("hide");
  $('h3').toggleClass("hide");
  gettingMovies();
});
