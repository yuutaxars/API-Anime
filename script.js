// Referencia al formulario y al contenedor de tarjetas
const form = document.getElementById('anime-search-form');
const animeContainer = document.getElementById('anime-container');

// Escucha el evento de envío del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita el refresco de la página
  const query = document.getElementById('anime-search').value.trim(); // Obtiene el valor del input
  fetchAnime(query); // Llama a la función para buscar el anime
});

// Función para buscar y mostrar animes
function fetchAnime(query) {
  animeContainer.innerHTML = '<p>Cargando...</p>'; // Mensaje de carga
  const url = `https://api.jikan.moe/v4/anime?q=${query}&limit=10`; // URL de la API

  // Realiza la solicitud a la API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      animeContainer.innerHTML = ''; // Limpia resultados previos
      if (data.data.length === 0) {
        animeContainer.innerHTML = '<p>No Hay Resultados Encontrados.</p>'; // Si no hay resultados
        return;
      }

      // Crea y agrega tarjetas para cada anime
      data.data.forEach((anime) => {
        animeContainer.innerHTML += `
          <div class="card">
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p><strong>Episodes:</strong> ${anime.episodes ?? 'Unknown'}</p>
            <p><strong>Score:</strong> ${anime.score ?? 'N/A'}</p>
          </div>
        `;
      });
    })
    .catch((error) => {
      animeContainer.innerHTML = '<p>Error al obtener datos. Por favor, inténtelo de nuevo más tarde.</p>'; // Manejo de errores
      console.error('Error:', error);
    });
}
