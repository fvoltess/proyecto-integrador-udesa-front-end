document.addEventListener('DOMContentLoaded', function () { //Cuando carga el HTML(evento: DOMContentLoaded), se ejecuta
  console.log('buenasss');        
});

const API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02'; // Clave de la API de TMD
const URL_API = 'https://api.themoviedb.org/3'; // Link base de la API 

document.addEventListener('DOMContentLoaded', function () {
  fetch(`${URL_API}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.results);       // Array de peliculas
    })
    .catch(function (error) {
      console.log('El error es: ', error);
    });
});