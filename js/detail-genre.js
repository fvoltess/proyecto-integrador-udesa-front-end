let API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02';
let URL_IMG = 'https://image.tmdb.org/t/p/w500';
let FALLBACK = './img/fallback.jpg';

let queryString = location.search;
let datos = new URLSearchParams(queryString);
let idGenero = datos.get("id");
let tipo = datos.get("tipo"); 

let titulo = document.querySelector("#titulo-genero");
let contenedor = document.querySelector(".contenedor-tarjetas");

let endpoint = "";
if (tipo === "pelicula") {
  endpoint = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + "&with_genres=" + idGenero + "&language=es-ES";
  titulo.innerText = "Películas del género";
} else if (tipo === "serie") {
  endpoint = "https://api.themoviedb.org/3/discover/tv?api_key=" + API_KEY + "&with_genres=" + idGenero + "&language=es-ES";
  titulo.innerText = "Series del género";
}
fetch(endpoint)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let resultados = data.results;

    for (let i = 0; i < resultados.length; i++) {
      let item = resultados[i];
      let nombre = tipo === "pelicula" ? item.title : item.name;
      let imagen = item.poster_path ? URL_IMG + item.poster_path : FALLBACK;
      let id = item.id;
      let link = tipo === "pelicula" ? `detail-movie.html?id=${id}` : `detail-series.html?id=${id}`;

      contenedor.innerHTML += `
        <article class="tarjeta">
          <a href="${link}">
            <img src="${imagen}" alt="${nombre}" class="movie-poster" />
            <h3>${nombre}</h3>
          </a>
        </article>
      `;
    }
  })
  .catch(function(error) {
    contenedor.innerHTML = "<p>Error al cargar el contenido.</p>";
    console.log("Error: ", error);
  });
