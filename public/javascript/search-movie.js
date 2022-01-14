// const { response } = require("express");
// const res = require("express/lib/response");

var movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

const IMAGE_URL = `https://image.tmdb.org/t/p/w500`
const url = `https://api.themoviedb.org/3/search/movie/`;
const apiKey = "f4ba895ea5be84ce3be947bc2a778568"

async function clearList(){
    await delay(5) // delays the clear for 10ms
    searchList.innerHTML="";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));//takes time to finish the promise 
  }

// load movies from API

async function loadMovies(searchTerm) {

    var searchURL = `${url}?api_key=${apiKey}&query=${searchTerm}`;
 //console.log(url)
    var response = await fetch(searchURL);
    //console.log(response)
    var data = response.json();
    //console.log(data);

    (async () => {
        if(await data){          
            displayMovieList(await data);
        }
      })()


   // if(data) {
        //console.log(data)
      //  displayMovieList(data.Search);
      //  console.log("In If")
      //  console.log(response.body)
   // }
  
}

function findMovies(){
    // console.log(movieSearchBox);
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(jsonData){
    const movies = jsonData.results
    // console.log("diaplayMovies");
    // console.log(movies);
    searchList.innerHTML = "";
    for(let id = 0; id < movies.length; id++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[id].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        movieListItem.onclick = function(e){ 
        console.log(e)
        loadMovieDetails(movies[id]) };
        if(IMAGE_URL + movies.poster_path != "N/A")
            moviePoster = IMAGE_URL +movies.poster_path;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail")>
        <img src = "${IMAGE_URL + movies[id].poster_path}">
        </div>
        <div class = "search-item-info">
        <h3>${movies[id].title}</h3>
        <p>${movies[id].release_date}</p>
        </div>`;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(movie){
    // console.log("in load movie details");
    console.log(movie);
    if(IMAGE_URL + movie.poster_path != "N/A")
        moviePoster = IMAGE_URL +movie.poster_path;
    else 
        moviePoster = "image_not_found.png";
    resultGrid.innerHTML=`
    <div class = "movie-poster">
                        <img src = "${moviePoster}" alt = "movie poster">
                        
                    </div>
                    <div class = "movie-info">
                        <h3 class = "movie-title">${movie.title}</h3>
                        <ul class = "movie-misc-info">
                            <li class = "released">${movie.release_date}</li>
                        </ul>
                        <p class = "plot"><b>Plot:</b> ${movie.overview}</p>
                        <p class = "language"><b>Language:</b>${movie.original_language}</p>

                    </div> 
                    `
}