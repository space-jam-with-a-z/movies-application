/**
 * es6 modules and imports
 */
import movies from './api.js';

// /**
//  * require style imports
//  */
// const {getMovies} = require('./api.js');

function gettingMovies() {

  movies.getMovies().then((movies) => {

    console.log('Here are all the movies:');

    $('button').toggleClass("hide");
    $('h1').toggleClass("hide");
    $('h3').toggleClass("hide");


    let html = `<div class="row">`;

    movies.forEach(({title, rating, id, img, genre}) => {


      html += "<div ";
      html += "class=\"col-sm-6 col-3-md movies\"";
      html += " style=\"background-image:";
      html += ` url(../${img})\"`;
      html += ">";
      html += `<p>id#${id}</p>`;
      html += `<p>${title}</p>`;
      html += `<p>${genre}</p>`;
      html += `<p>rating: ${rating}</p>`;
      html += "</div>";


    });

    $(".container").html(html + "</div>");

  }).catch((error) => {

    alert('Oh no! Something went wrong.\nCheck the console for details.')

    console.log(error);

  });

}

gettingMovies();

$("#add").on("click", function(){

  let addTitle = prompt("What is the title of the movie you want to add?");

  let addGenre = prompt(`What is the genre of ${addTitle}?`);

  let addRating = prompt(`Please choose a rating for ${addTitle} between 1 and 5.`);

  alert(`The movie being added is:\n\nTitle: ${addTitle}\nGenre: ${addGenre}\nRating: ${addRating}`);

  movies.addMovie(addTitle, addGenre, addRating);

  $(".container").html("<p id='image'><img src='https://i.gifer.com/SjyG.gif' alt='loading'></p>");

  $('button').toggleClass("hide");

  $('h1').toggleClass("hide");

  $('h3').toggleClass("hide");

  gettingMovies();
  //
  //
  // setTimeout(function(){
  //
  //   gettingMovies();
  //
  //
  //                     }, 2000);


});

$("#delete").on("click", function(){

  let deleteTitle = prompt("What is the title of the movie you want to delete?");

  alert(`The movie being deleted is \"${deleteTitle}\".`);

});
