/*----------------- VARIABLES ----------------*/ 

let API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02'; // Clave de la API de TMD
let URL_API = 'https://api.themoviedb.org/3'; // Link base de la API
let URL_IMG  = 'https://image.tmdb.org/t/p/w500'; // w500=tamaño de 500px
let FALLBACK = './img/fallback.jpg'; // Imagen default si falla

/* ----------  MAIN  ---------- */

document.addEventListener('DOMContentLoaded', function () { //Cuando carga el HTML(evento: DOMContentLoaded), se ejecuta
  console.log('buenasss');
  cargarTopMovies();
  cargarTopSeries();
  //cargarPeliculasPopulares();


});

/* ----------  PELICULA MEJOR VALORADAS  ---------- */
function cargarTopMovies() {
  let contenedor = document.querySelector('.movie-posters-container');

  fetch(`${URL_API}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      for (let i = 0; i < 5; i++) {
        let pelicula = datos.results[i];

        // Insertamos el HTML generado por la función
        contenedor.innerHTML += crearTarjeta(
          pelicula.id,
          pelicula.title,
          pelicula.release_date,
          pelicula.poster_path,
          true // es pelicula
        );
      }
    })
    .catch(function (error) {
      contenedor.innerHTML = '<p>Error al cargar las pelicula.</p>';
      console.log('Ocurrió un error al pedir las peliculas: ', error);
    });
}

/* ----------  SERIES MEJOR VALORADAS  ----------- */

function cargarTopSeries() {
  let contenedorSeries = document.querySelectorAll('.contenedor-tarjetas')[0]; //.contenedor-tarjetas (posición 0) es donde van las  series

  fetch(`${URL_API}/tv/top_rated?api_key=${API_KEY}&language=es-ES&page=1`)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      for (let i = 0; i < 5; i++) {
        let serie = datos.results[i];

        contenedorSeries.innerHTML += crearTarjeta(
          serie.id,
          serie.name,            
          serie.first_air_date,  
          serie.poster_path,
          false                 // es serie
        );
      }
    })
    .catch(function (error) {
      contenedorSeries.innerHTML = '<p>Error al cargar las series.</p>';
      console.log('ocurrió un error al pedir las series: ', error);
    });
}


/* --------  PELICULAS MAS POPULARES  ---------- */

/* ----------  CREAR TARJETA DE PELICULA/SERIE ---------- */
function crearTarjeta(id, titulo, fecha, posterPath, esPelicula) {
  let linkDetalle;
  if (esPelicula === true) {
    linkDetalle = `detail-movie.html?id=${id}`;
  } else {
    linkDetalle = `detail-serie.html?id=${id}`;
  }

  let imagen;
  if (posterPath) {
    imagen = URL_IMG + posterPath;
  } else {
    imagen = FALLBACK;
  }

  let textoFecha;

if (fecha) {
  textoFecha = fecha;
} else {
  textoFecha = 'Sin dato';
}

return `
  <article class="poster-card">
    <a href="${linkDetalle}">
      <img src="${imagen}" alt="${titulo}" class="movie-poster" />
      <h3>${titulo}</h3>
      <p>Fecha de estreno: ${textoFecha}</p>
    </a>
  </article>
`;

}