const API_KEY = "api_key=832ea43884084a3b5f534f3324454a65";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const TV_URL =
  BASE_URL +
  "/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&" +
  API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//const API_KEY = 'YOUR_API_KEY';
//const API_URL = `https://api.example.com/movies?key=${API_KEY}&limit=5`; // Replace with your API URL

/*const body = document.querySelector('.container');
  const imageUrls = ['BLACK\ SCREEN.jpg', 'BLACK\ SCREEN.jpg', 'BLACK\ SCREEN.jpg'];
  
  let currentImageIndex = 0;
  
  function changeBackgroundImage() {
    container.style.backgroundImage = `url("${imageUrls[currentImageIndex]}")`;
  
    currentImageIndex++;
    if (currentImageIndex === imageUrls.length) {
      currentImageIndex = 0;
    }
  }
  
  setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds*/

const bannerImage = document.getElementById("banner-image");
const bannerText = document.getElementById("banner-text");

function fetchMovies() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      let currentMovieIndex = 0;

      function showMovie(index) {
        const movie = movies[index];
        const imageUrl = IMG_URL + movie.poster_path;
        bannerImage.src = imageUrl;
        bannerText.textContent = movie.title;
      }

      function nextMovie() {
        currentMovieIndex++;
        if (currentMovieIndex >= movies.length) {
          currentMovieIndex = 0;
        }
        showMovie(currentMovieIndex);
      }

      // Start the slideshow
      showMovie(currentMovieIndex);
      setInterval(nextMovie, 3000); // Switch to the next movie every 3 seconds
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

fetchMovies();
