// ---------------- VARIABLES ----------------

const API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02'; 
const URL_API = 'https://api.themoviedb.org/3';
const URL_IMG = 'https://image.tmdb.org/t/p/w500';
const FALLBACK = './img/fallback.jpg';

// ---------------- MAIN ----------------

document.addEventListener('DOMContentLoaded', function () {
  console.log("Página cargada");

  let queryString = location.search;
  let datos = new URLSearchParams(queryString);
  let id = datos.get("id");
  console.log('ID limpio:', id);

  fetch(URL_API + '/movie/' + id + '?api_key=' + API_KEY + '&language=es-ES')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('Datos de la película:', data);

      document.title = data.title; // para cambiar el titulo de la pestaña del navegador

    let contenedor = document.querySelector('.detalle-contenedor');
    let imagen;
    if (data.poster_path) {
      imagen = URL_IMG + data.poster_path;
    } else {
      imagen = FALLBACK;
    }

    let generos = '';
    for (let i = 0; i < data.genres.length; i++) {
      generos += data.genres[i].name;
      if (i < data.genres.length - 1) {
        generos += ', ';
      }
    }

    contenedor.innerHTML = `
      <div class="poster-de-peli">
        <img src="${imagen}" alt="${data.title}" class="foto-peli">
      </div>
      <section class="info-peli">
        <div class="nombre-peli">
        <h1 class="nombre">${data.title}</h1>
        </div>

        <div class="detalles">
        <div class="imdb-texto">
          <h2 class="fecha">Fecha de estreno: ${data.release_date}</h2>
        </div>
        
        <h2 class="duracion">${data.runtime} minutos</h2>
        <h2 class="sinopsis-title">Sinopsis:</h2>
        <p class="sinopsis">${data.overview}</p>
        <h2 class="genero">Géneros: ${generos}</h2>
        </div>
      </section>
    `;
    })
    .catch(function(error) {
      console.log('Ocurrió un error al pedir los datos:', error);
    });
});