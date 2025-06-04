let API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02';
let URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY + '&language=es-ES';

let lista = document.querySelector('.lista-generos');

fetch(URL)
  .then(function(respuesta) {
    return respuesta.json();
  })
  .then(function(data) {
    let generos = data.genres;

    for (let i = 0; i < generos.length; i++) {
      let genero = generos[i];
      lista.innerHTML += `
        <li>
          <a href="detail-genre.html?id=${genero.id}&tipo=pelicula">${genero.name}</a>
        </li>
      `;
    }
  })
  .catch(function(error) {
    console.log("Error al cargar géneros de películas: ", error);
  });
