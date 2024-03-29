const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
//var languageCode = 'te'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const lan = [
  {
    "languageCode": 'te',
    "name": 'Telugu'
  },
  {
    "languageCode": 'en',
    "name": 'English'
  },
  {
    "languageCode": 'hi',
    "name": 'Hindi'
  },
  {
    "languageCode": 'ml',
    "name": 'Malayalam'
  },
  {
    "languageCode": 'ta',
    "name": 'Tamil'
  },
  {
    "languageCode": 'kn',
    "name": 'Kannada'
  },
];


  const main = document.getElementById('main');
  const form =  document.getElementById('form');
  const search = document.getElementById('search');
  const tagsEl = document.getElementById('tags');
  
  const prev = document.getElementById('prev')
  const next = document.getElementById('next')
  const current = document.getElementById('current')
  
  var currentPage = 1;
  var nextPage = 2;
  var prevPage = 3;
  var lastUrl = '';
  var totalPages = 100;

  




  var selectedlang = [];

selectLang();

function selectLang() {
  tagsEl.innerHTML = '';

  lan.forEach(lang => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.dataset.languageCode = lang.languageCode; // Use dataset to store custom data
    t.innerText = lang.name;

    t.addEventListener('click', () => {
      const languageCode = lang.languageCode;
  
      // Check if the language code is already selected
      const isLanguageSelected = selectedlang.includes(languageCode);
  
      // Toggle selection
      if (!isLanguageSelected) {
          // If not selected, add to the selectedlang array
          selectedlang.push(languageCode);
      } else {
          // If selected, remove from the selectedlang array
          selectedlang = selectedlang.filter(code => code !== languageCode);
      }
  
      // If nothing is selected, show all results
      if (selectedlang.length === 0) {
          // Call getMovies without language filter
          getMovies(API_URL);
      } else {
          // Call getMovies with language filter
          getMovies(API_URL + '&with_original_language=' + encodeURI(selectedlang.join(',')));
      }
  
      console.log(selectedlang);
      highlightSelection();
  });
  

    tagsEl.append(t);
  });
}

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
      tag.classList.remove('highlight');
  });
  clearBtn()
  if (selectedlang.length !== 0) {   
      selectedlang.forEach(languageCode => {
          const highlightedTag = document.querySelector(`.tag[data-language-code="${languageCode}"]`);
          if (highlightedTag) {
              highlightedTag.classList.add('highlight');
          }
      });
  }
}


function clearBtn(){
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
      clearBtn.classList.add('highlight')
  }else{
          
      let clear = document.createElement('div');
      clear.classList.add('tag','highlight');
      clear.id = 'clear';
      clear.innerText = 'Clear x';
      clear.addEventListener('click', () => {
          selectedlang = [];
          selectLang();            
          getMovies(API_URL);
      })
      tagsEl.append(clear);
  }
  
} 
  
  getMovies(API_URL);
  
  function getMovies(url) {
    lastUrl = url;
      fetch(url).then(res => res.json()).then(data => {
          console.log(data.results)
          if(data.results.length !== 0){
              showMovies(data.results);
              currentPage = data.page;
              nextPage = currentPage + 1;
              prevPage = currentPage - 1;
              totalPages = data.total_pages;
  
              current.innerText = currentPage;
  
              if(currentPage <= 1){
                prev.classList.add('disabled');
                next.classList.remove('disabled')
              }else if(currentPage>= totalPages){
                prev.classList.remove('disabled');
                next.classList.add('disabled')
              }else{
                prev.classList.remove('disabled');
                next.classList.remove('disabled')
              }
  
              tagsEl.scrollIntoView({behavior : 'smooth'})
  
          }else{
              main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
          }
         
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
      selectedGenre=[];
      setGenre();
      if(searchTerm) {
          getMovies(searchURL+'&query='+searchTerm)
      }else{
          getMovies(API_URL);
      }
  
  })
  
  prev.addEventListener('click', () => {
    if(prevPage > 0){
      pageCall(prevPage);
    }
  })
  
  next.addEventListener('click', () => {
    if(nextPage <= totalPages){
      pageCall(nextPage);
    }
  })
  
  function pageCall(page){
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if(key[0] != 'page'){
      let url = lastUrl + '&page='+page
      getMovies(url);
    }else{
      key[1] = page.toString();
      let a = key.join('=');
      queryParams[queryParams.length -1] = a;
      let b = queryParams.join('&');
      let url = urlSplit[0] +'?'+ b
      getMovies(url);
    }
  }