// (function() {
"use strict";

import movies from './api.js';

const reloadHtml = () => {
  $(".clean").html("<p id='image'><img src='https://i.gifer.com/SjyG.gif' alt='loading'></p>");
  $('button').toggleClass("hide");
  $('input').toggleClass("hide");
  $('h1').toggleClass("hide");
  $('h3').toggleClass("hide")
};

const gettingMovies = () => {
  movies.getMovies().then((movies) => {
    $('button').toggleClass("hide");
    $('h1').toggleClass("hide");
    $('h3').toggleClass("hide");
    $('input').toggleClass("hide");

    let html = `<div class="row justify-content-center">`;

    movies.forEach(({title, rating, id, img, genre}) => {
      html += `
    <div class="col-xs-8 col-sm-6 col-md-3 movies p-0 i-container box">
        <span>ID: ${id}</span>           
        <img src="../${img}" alt="img" style="max-width: 100%; height: auto" class="image">
        <div class="middle">
        </div>
    </div>`;
    });

    $(".clean").html(html + "</div>");

  }).catch((error) => {
    console.warn('Oh no! Something went wrong.');
    console.log(error);
  });

};

gettingMovies();

// Add button functionality
$("#add").on("click", () => {

  let addTitle = $("#addTitle").val();
  let addGenre = $("#addGenre").val();
  let addRating = $("#addRating").val();

  alert(`The movie being added is:\n\nTitle: ${addTitle}\nGenre: ${addGenre}\nRating: ${addRating}`);

  movies.addMovie(addTitle, addRating, addGenre);

  reloadHtml();
  gettingMovies();

}); // end: #add function

// Delete button functionality
$(`#delete`).on("click", () => {

  let deleteID = prompt("Please enter the ID of the movie you want to delete.");

  movies.deletingMovie(deleteID);

  reloadHtml();
  gettingMovies();

}); // end: #delete function

// Edit functionality
$(`#idToEdit`).on("keyup", () => {

  let editID = $("#idToEdit").val();

  console.log(movies.getMovies().then((data) => {
    console.log(data[editID - 1]);

    $("#addTitle").val(data[editID - 1].title);
    $("#addGenre").val(data[editID - 1].genre);
    $("#addRating").val(data[editID - 1].rating);

    let img = data[editID - 1].img;

    $("#edit").on("click", () => {
      movies.editMovie($("#addTitle").val(), $("#addGenre").val(), $("#addRating").val(), img, editID);

      reloadHtml();
      gettingMovies();

    });
  }));
}); // end: #idToEdit function


// }); // end: IIFE