"use strict";

/* passos
- selecciono os elementos HTML: input, botao  FEITO
- recolho a info do que a usuaria escreve no input FEITO
- quando a usuaria fizer click no botao "buscar" - evento
    - faço um fetch ao servidor FEITO
    - Procuro ver se a info na minha API coincide com o que a usuaria escreveu com o metodo filter:
        - se estiver, pinto na web as series que coinciden FEITO
        - se nao, imagem placeholder ou NOT FOUND --> CONDICIONAL IF-ELSE

*/
const inputSearch = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-button");
const cont = document.querySelector(".js-container");
const favoritesCont = document.querySelector(".js-favorites");
const resetButton = document.querySelector(".js-reset-button");
let animeList = [];
let favoriteAnimeList = [];

// Cargar favoritos de localStorage al iniciar
function loadFavoritesFromLocalStorage() {
  const storedFavorites = localStorage.getItem("favoriteAnimeList");
  if (storedFavorites) {
    favoriteAnimeList = JSON.parse(storedFavorites);
    renderFavorites();
  }
}

loadFavoritesFromLocalStorage();

// Renderizar lista de favoritos
function renderFavorites() {
  favoritesCont.innerHTML = "";
  for (const favoriteAnime of favoriteAnimeList) {
    favoritesCont.innerHTML += `<div class="favorite-anime">
      <h4>${favoriteAnime.title}</h4>
      <img src="${favoriteAnime.images.jpg.image_url}" alt="Imagem de ${favoriteAnime.title}">
    </div>`;
  }
}

// Manipular la adición de favoritos
function handleAddFavorite(event) {
  const idSerieClicked = event.currentTarget.id;
  const seriesSelected = animeList.find(
    (serie) => serie.mal_id === parseInt(idSerieClicked)
  );
  const isAlreadyFavorite = favoriteAnimeList.some(
    (fav) => fav.mal_id === parseInt(idSerieClicked)
  );

  if (!isAlreadyFavorite) {
    favoriteAnimeList.push(seriesSelected);

    //guardar en local Storage
    localStorage.setItem(
      "favoriteAnimeList",
      JSON.stringify(favoriteAnimeList)
    );
  }

  event.currentTarget.classList.toggle("favorite");
  renderFavorites();
}

// Función para manejar la búsqueda
function handleSearch() {
  const inputValue = inputSearch.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      animeList = data.data;
      cont.innerHTML = "";

      for (const anime of animeList) {
        let url = anime.images.jpg.image_url;
        if (
          url ===
          "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
        ) {
          url =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s";
        }

        cont.innerHTML += `<div class="js-listOfAnime" id=${anime.mal_id}>
          <h4>${anime.title}</h4>
          <img src="${url}" alt="Imagen de ${anime.title}">
          </div>`;
      }

      const allFavAnime = document.querySelectorAll(".js-listOfAnime");
      for (const animeFavEl of allFavAnime) {
        animeFavEl.addEventListener("click", handleAddFavorite);
      }
    });
}

searchButton.addEventListener("click", handleSearch);

// Función para resetear el estado inicial
function handleReset() {
  inputSearch.value = "";
  cont.innerHTML = "";
  favoritesCont.innerHTML = "";
  animeList = [];
  favoriteAnimeList = [];
  localStorage.removeItem("favoriteAnimeList");
}

resetButton.addEventListener("click", handleReset);
