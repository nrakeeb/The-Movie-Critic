async function newFormHandler(event) {
    event.preventDefault(); 

    const ranking = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
    const movie_title_element = document.getElementsByClassName("movie-title")[0]; // finds the movie element from the innerHTML in searchMovies
    const moviePoster = document.getElementById("movie-id").src; // finding the element of movie-id 


    const movieReponse = await postToAPI(
        '/api/movies',
        JSON.stringify({"imdb_id":movie_title_element.id,"title":movie_title_element.textContent,"image_url":moviePoster}));
        // saves movie into the database
    let movie_id = movieReponse.movie_id; //brings back the object
        console.log(movieReponse)
    postToAPI('/api/posts',JSON.stringify({
        ranking,
        post_content,
        movie_id
    })).then( 
        response => {
             document.location.replace('/dashboard')
        })

}

async function postToAPI(url,data){
    const response = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json(); 
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);