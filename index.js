const API_KEY = 'api_key=832ea43884084a3b5f534f3324454a65';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const  TV_URL = BASE_URL + '/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;

/*const genres = {

  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
}*/



const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

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

const bannerImage = document.getElementById('banner-image');
const bannerText = document.getElementById('banner-text');

function fetchMovies() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      let currentMovieIndex = 0;

       function showMovie(index) {
        const movie = movies[index];
        const imageUrl = IMG_URL + movie.poster_path;
        bannerImage.src =imageUrl;
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
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }

  fetchMovies();



/*getMovies(API_URL);

function getMovies(url) {
  
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3>Overview</h3>
                ${overview}
                <br/> 
                <button class="know-more" id="${id}">Know More</button
            </div>
        
        `

        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })
    })
}



function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})*/
