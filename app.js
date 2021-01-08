'use strict';
const parentContainer = document.querySelector('.container');
const MOVIEAPI = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const btnRating = document.querySelector('.sort-rating');
const btnName = document.querySelector('.sort-name');
const searchMovie = document.querySelector('.input-movie');



const getData =async function(url){
    const res = await fetch(url)
    const data =await res.json();

    //DESTRUCTURING OBJECT
    const {results} = data;
    //CALLING FUNCTION AND PASSING VALUE
    addMovie(results);

    //SORT BY RATING EVENT
   btnRating.addEventListener('click', function(){
    parentContainer.innerHTML ="";    
   const newArr = results.slice();
    newArr.sort(function (a,b) {
        return a.vote_average - b.vote_average;
        
    });
      addMovie(newArr);
            
        })
        //SORT BY NAMES EVENT
        btnName.addEventListener('click', function(){
            parentContainer.innerHTML ="";
            const newArrr = results.slice();
             newArrr.sort(function (a,b) {
                 if(a.title > b.title){
                     return -1;
                 }else{
                     return 1;
                 }
                 return 0;
                 
             });
             //DISPLAY SORTED MOVIE LIST
            addMovie(newArrr);
            
        })
}
getData(MOVIEAPI);


//ADDING MOVIE ON PAGE RELOAD
const addMovie = (movies) => {
    movies.forEach((movie) =>{
        // console.log(movie);

        const html = `
        <div class="card">
            <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}">
            <div class="info">
                <h3 class="movie-title">${movie.title}</h3>
                <span class="rating">${movie.vote_average}</span>
            </div>
        </div>
        `;
        parentContainer.insertAdjacentHTML('afterbegin' , html);
    })
}


window.addEventListener('submit' ,function(e){
    e.preventDefault();
    const searchTerm = searchMovie.value;
    if(searchTerm){
        getData(SEARCHAPI + searchTerm);
        parentContainer.innerHTML = '';
        
        searchMovie.value = '';
    }    
    
})

