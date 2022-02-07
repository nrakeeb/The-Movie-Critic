// const { response } = require("express");
// const res = require("express/lib/response");

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

const IMAGE_URL = `https://image.tmdb.org/t/p/w500`
const url = `https://api.themoviedb.org/3/search/movie`;
const apiKey = "f4ba895ea5be84ce3be947bc2a778568"


// let movies=[];

async function clearList(){
    await delay(500) // delays the clear for 10ms
    searchList.innerHTML="";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));//takes time to finish the promise 
  }

// load movies from API

async function loadMovies(searchTerm) {

    let searchURL = `${url}?api_key=${apiKey}&query=${searchTerm}`;
 //console.log(url)
    let response = await fetch(searchURL);
    //console.log(response)
    let data = response.json();
    //console.log(data);

    await (async () => {
        if (await data) {
            displayMovieList(await data);
        }
    })()

    
  
}

function findMovies(){
    // console.log(movieSearchBox);
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm).then();
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(jsonData){
    let movies = jsonData.results
    searchList.innerHTML = "";
    for(let id = 0; id < movies.length; id++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[id].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
         movieListItem.onclick = function(){loadMovieDetails(movies[id])};
        let moviePoster = "image_not_found.png"
        if(IMAGE_URL + movies[id].poster_path !== "N/A")
            moviePoster = IMAGE_URL + movies[id].poster_path;


        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
        <img src = "${moviePoster}" alt="">
        </div>
        
        <div class = "search-item-info">
        <h3>${movies[id].title}</h3>
        <p>${movies[id].release_date}</p>
        </div>`;
        searchList.appendChild(movieListItem);
    }

}

function loadMovieDetails(movie){

    let moviePoster = "image_not_found.png"

    if(IMAGE_URL + movie.poster_path !== "N/A")
        moviePoster = IMAGE_URL + movie.poster_path;


    resultGrid.innerHTML=`
    <div class = "movie-poster">
                        <img src = "${moviePoster}" alt = "movie poster" id="movie-id">
                        
                    </div>
                    <div class = "movie-info">
                        <h3 class = "movie-title" id="${movie.id}">${movie.title}</h3> 
                        <ul class = "movie-misc-info">
                            <li class = "released">${movie.release_date}</li>
                        </ul>
                        <p class = "plot"><b>Plot:</b> ${movie.overview}</p>
                        <p class = "language"><b>Language:</b>${movie.original_language}</p>

                    </div> 
                    `
return "done";

}