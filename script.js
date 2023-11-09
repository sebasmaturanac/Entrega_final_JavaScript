const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

// Intenta cargar la última búsqueda al cargar la página
window.onload = function() {
  const lastSearch = localStorage.getItem('lastSearch');
  if (lastSearch) {
    searchMovies(lastSearch);
    searchInput.value = lastSearch;
  }
};

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = searchInput.value;
    if (searchQuery) {
      // Almacena la búsqueda actual en localStorage
      localStorage.setItem('lastSearch', searchQuery);
      searchMovies(searchQuery);
      searchInput.value = '';
    }
  }
});

function searchMovies(searchQuery) {
  const apiKey = '1983df27'; // API KEY de OMDb
  const apiUrl = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo obtener información de la película.');
      }
      return response.json();
    })
    .then((data) => {
      if (data.Response === 'True') {
        const movies = data.Search;

        if (movies && movies.length > 0) {
          const movieList = document.createElement('ul');
          movies.forEach((movie) => {
            const movieItem = document.createElement('li');
            movieItem.innerHTML = `
              <strong>${movie.Title} (${movie.Year})</strong>
              <button onclick="getMovieDetails('${movie.imdbID}')">Ver Trama</button>
            `;
            movieList.appendChild(movieItem);
          });
          resultContainer.innerHTML = '';
          resultContainer.appendChild(movieList);
        } else {
          showAlert('No se encontraron películas.');
        }
      } else {
        showAlert('No se encontraron películas.');
      }
    })
    .catch((error) => {
      showAlert('No se pudo obtener información de la película.');
      console.error(error);
    });
}

function getMovieDetails(imdbID) {
  const apiKey = '1983df27';
  const apiUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo obtener información de la película.');
      }
      return response.json();
    })
    .then((data) => {
      const plot = data.Plot;
      openPopup('Trama de la Película', plot);
    })
    .catch((error) => {
      showAlert('No se pudo obtener información de la película.');
      console.error(error);
    });
}

function openPopup(title, content) {
  const popup = window.open('', '_blank', 'width=400,height=300');
  popup.document.write(`
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
        <p>${content}</p>
      </body>
    </html>
  `);
}

function showAlert(message) {
  alert(message);
}

