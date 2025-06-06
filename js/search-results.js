let API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02';
let URL_BASE = 'https://api.themoviedb.org/3';
let URL_IMG = 'https://image.tmdb.org/t/p/w500';
let FALLBACK = './img/fallback.jpg';

let queryString = location.search;
let datos = new URLSearchParams(queryString);
let termino = datos.get("q");
let tipo = datos.get("tipo");

let titulo = document.querySelector("#titulo-busqueda");
let contenedor = document.querySelector(".contenedor-tarjetas");
let spinner = document.querySelector("#spinner");

titulo.innerText = "Resultados de búsqueda para: " + termino;

let endpoint = "";
if (tipo === "pelicula") {
  endpoint = "/search/movie";
}
if (tipo === "serie") {
  endpoint = "/search/tv";
}
if (tipo !== "pelicula" && tipo !== "serie") {
  endpoint = "/search/movie";
}

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
        let tituloFinal = "";
        let fecha = "";
        let poster = item.poster_path;
        let id = item.id;

        if (tipo === "pelicula") {
          tituloFinal = item.title;
          fecha = item.release_date;
        }
        if (tipo === "serie") {
          tituloFinal = item.name;
          fecha = item.first_air_date;
        }

        contenedor.innerHTML += crearTarjeta(id, tituloFinal, fecha, poster, tipo);
      }
    }
  })
  .catch(function() {
    console.log("Error en la carga.");
  });

function crearTarjeta(id, titulo, fecha, poster, tipo) {
  let link = "";
  if (tipo === "pelicula") {
    link = "detail-movie.html?id=" + id;
  }
  if (tipo === "serie") {
    link = "detail-serie.html?id=" + id;
  }

  let imagen = FALLBACK;
  if (poster !== null) {
    imagen = URL_IMG + poster;
  }

  let textoFecha = "Sin fecha";
  if (fecha !== undefined && fecha !== "") {
    textoFecha = fecha;
  }

  let estructura =
    '<article class="tarjeta">' +
      '<a href="' + link + '">' +
        '<img src="' + imagen + '" alt="' + titulo + '" class="movie-poster"/>' +
        '<h3>' + titulo + '</h3>' +
        '<p>Fecha de estreno: ' + textoFecha + '</p>' +
      '</a>' +
    '</article>';

  return estructura;
}
