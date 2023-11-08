const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const searchQuery = searchInput.value;
    if (searchQuery) {
      searchMovie(searchQuery);
      searchInput.value = '';
    }
  }
});

function searchMovie(searchQuery) {
  const apiKey = '1983df27'; // API KEY de OMDb
  const apiUrl = `https://www.omdbapi.com/?t=${searchQuery}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No se pudo obtener información de la película.');
      }
      return response.json();
    })
    .then((data) => {
      if (data.Response === 'True') {
        const movieData = {
          title: data.Title,
          year: data.Year,
          plot: data.Plot,
        };
        
        const movieInfo = document.createElement('div');
        movieInfo.innerHTML = `
          <h2>Título: ${movieData.title}</h2>
          <p>Año: ${movieData.year}</p>
          <p>Trama: ${movieData.plot}</p>
        `;
        resultContainer.innerHTML = '';
        resultContainer.appendChild(movieInfo);
      } else {
        showAlert('Película no encontrada');
      }
    })
    .catch((error) => {
      showAlert('No se pudo obtener información de la película.');
      console.error(error);
    });
}

function showAlert(message) {
  alert(message);
}


