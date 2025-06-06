/*----------------- VARIABLES ----------------*/ 

let API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02'; // Clave de la API de TMD
let URL_API = 'https://api.themoviedb.org/3'; // Link base de la API
let URL_IMG  = 'https://image.tmdb.org/t/p/w500'; // w500=tamaño de 500px
let FALLBACK = './img/fallback.jpg'; // Imagen default si falla

/* ----------  MAIN  ---------- */

document.addEventListener('DOMContentLoaded', function () { //Cuando carga el HTML(evento: DOMContentLoaded), se ejecuta
  console.log('Cargado');
  cargarTopMovies();
  cargarTopSeries();
  cargarPeliculasPopulares();
  cargarRecomendacionCasa(); // extra

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


/* ----------  PELÍCULAS MÁS POPULARES  ---------- */
function cargarPeliculasPopulares() {
  let contenedorPop = document.querySelectorAll('.contenedor-tarjetas')[1];

  let url = URL_API + '/movie/popular?api_key=' + API_KEY + '&language=es-ES&page=1';

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      for (let i = 0; i < 5; i++) {
        let peli = datos.results[i];

        let id = peli.id;
        let titulo = peli.title;
        let fecha = peli.release_date;
        let poster = peli.poster_path;
        let esPelicula = true;

        contenedorPop.innerHTML += crearTarjeta(id, titulo, fecha, poster, esPelicula);
      }
    })
    .catch(function (error) {
      contenedorPop.innerHTML = '<p>Error al cargar las películas populares.</p>';
      console.log('Ocurrió un error al pedir las películas populares: ', error);
    });
}

/* ----------  RECOMENDACIÓN DE LA CASA ---------- */

function cargarRecomendacionCasa() {
  let contenedorRecomendacion = document.querySelectorAll('.contenedor-tarjetas')[2];

  let url = URL_API + '/movie/1458872?api_key=' + API_KEY + '&language=es-ES';

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (pelicula) {
      let id = pelicula.id;
      let titulo = pelicula.title;
      let fecha = pelicula.release_date;
      let poster = pelicula.poster_path;
      let esPelicula = true;

      contenedorRecomendacion.innerHTML += crearTarjeta(id, titulo, fecha, poster, esPelicula);
    })
    .catch(function (error) {
      contenedorRecomendacion.innerHTML = '<p>Error al cargar la recomendación.</p>';
      console.log('Ocurrió un error con la recomendación de la casa: ', error);
    });
}


/* ----------  CREAR TARJETA DE PELICULA/SERIE ---------- */
function crearTarjeta(id, titulo, fecha, posterPath, esPelicula) {
  // link
  let linkDetalle;
if (esPelicula === true) {
  linkDetalle = `detail-movie.html?id=${id}`;
} else {
  linkDetalle = `detail-series.html?id=${id}`;

}


  // imagen
  let imagen;
if (posterPath) {
  imagen = URL_IMG + posterPath;
} else {
  imagen = FALLBACK;
}


  //Fecha
  let textoFecha;
if (fecha) {
  textoFecha = fecha;
} else {
  textoFecha = 'Sin dato';
}

  // clase distinta según si es serie o pelicula
  let clase = 'tarjeta';

  return (
    `<article class="${clase}">
       <a href="${linkDetalle}">
         <img src="${imagen}" alt="${titulo}" class="movie-poster" />
         <h3>${titulo}</h3>
         <p>Fecha de estreno: ${textoFecha}</p>
       </a>
     </article>`
  );
}
