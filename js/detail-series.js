const API_KEY = 'dd7272a10fa82bffe9a6d08d4f2cff02'; 
const URL_API = 'https://api.themoviedb.org/3';
const URL_IMG = 'https://image.tmdb.org/t/p/w500';
const FALLBACK = './img/fallback.jpg';

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  if (!id) {
    document.querySelector('main').innerHTML = '<p>Error: serie no encontrada.</p>';
    return;
  }

  fetch(`${URL_API}/tv/${id}?api_key=${API_KEY}&language=es-ES`)
    .then(res => res.json())
    .then(data => {
      document.title = data.name;
      const contenedor = document.querySelector('.detalle-contenedor');
      const imagen = data.poster_path ? URL_IMG + data.poster_path : FALLBACK;
      const generos = data.genres.map(g => g.name).join(', ');

      contenedor.innerHTML = `
        <div class="poster-de-peli">
          <img src="${imagen}" alt="${data.name}" class="foto-peli">
        </div>
        <section class="info-peli">
          <div class="nombre-año">
            <h1 class="nombre">${data.name}</h1>
            <h1 class="año">${data.first_air_date || 'Sin fecha'}</h1>
          </div>
          <div class="detalles">
            <div class="imdb-texto">
              <h2 class="fecha">Fecha de estreno: ${data.first_air_date || 'Sin dato'}</h2>
            </div>
            <h2 class="duracion">${data.number_of_seasons} temporada(s), ${data.number_of_episodes} episodio(s)</h2>
            <h2 class="sinopsis-title">Sinopsis:</h2>
            <p class="sinopsis">${data.overview || 'Sin sinopsis disponible.'}</p>
            <h2 class="genero">Géneros: ${generos}</h2>
          </div>
        </section>
      `;
    })
    .catch(error => {
      console.error('Error al cargar los datos de la serie:', error);
      document.querySelector('main').innerHTML = '<p>Error al cargar los datos de la serie.</p>';
    });
});
