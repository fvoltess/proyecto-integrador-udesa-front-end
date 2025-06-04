let API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02';
let URL_BASE = 'https://api.themoviedb.org/3';
let URL_IMG = 'https://image.tmdb.org/t/p/w500';
let FALLBACK = './img/fallback.jpg';

// Obtener los parámetros de la URL
let queryString = location.search;
let datos = new URLSearchParams(queryString);
let termino = datos.get("q");
let tipo = datos.get("tipo"); // puede ser "pelicula" o "serie"

// Selección de elementos del DOM
let titulo = document.querySelector("#titulo-busqueda");
let contenedor = document.querySelector(".contenedor-tarjetas");
let spinner = document.querySelector("#spinner");

// Mostrar el título de búsqueda
titulo.textContent = "Resultados de búsqueda para: " + termino;

// Determinar endpoint correcto
let endpoint = "";
if (tipo === "pelicula") {
  endpoint = "/search/movie";
} else if (tipo === "serie") {
  endpoint = "/search/tv";
} else {
  endpoint = "/search/movie"; // default
}

// Construir la URL
let url = URL_BASE + endpoint + "?api_key=" + API_KEY + "&language=es-ES&query=" + termino;

fetch(url)
  .then(function(respuesta) {
    return respuesta.json();
  })
  .then(function(data) {
    spinner.style.display = "none";

    if (data.results.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
    } else {
      for (let i = 0; i < data.results.length; i++) {
        let item = data.results[i];
        let titulo = tipo === "pelicula" ? item.title : item.name;
        let fecha = tipo === "pelicula" ? item.release_date : item.first_air_date;
        let id = item.id;
        let poster = item.poster_path;

        contenedor.innerHTML += crearTarjeta(id, titulo, fecha, poster, tipo);
      }
    }
  })
  .catch(function(error) {
    spinner.style.display = "none";
    contenedor.innerHTML = "<p>Error al cargar los resultados.</p>";
    console.log("Error: ", error);
  });

// Función para crear tarjetas
function crearTarjeta(id, titulo, fecha, posterPath, tipo) {
  let link = "";
  if (tipo === "pelicula") {
    link = "detail-movie.html?id=" + id;
  } else {
    link = "detail-serie.html?id=" + id;
  }

  let imagen = posterPath ? URL_IMG + posterPath : FALLBACK;
  let textoFecha = fecha ? fecha : "Sin fecha";

 return `
  <article class="tarjeta">
    <a href="${link}">
      <img src="${imagen}" alt="${titulo}" class="movie-poster"/>
      <h3>${titulo}</h3>
      <p>Fecha de estreno: ${textoFecha}</p>
    </a>
  </article>
`;

}
