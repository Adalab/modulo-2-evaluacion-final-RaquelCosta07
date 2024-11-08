"use strict";

const inputSearch = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-button");
const cont = document.querySelector(".js-container");
const favoritesCont = document.querySelector(".js-favorites");
const resetButton = document.querySelector(".js-reset-button");
let animeList = [];
let favoriteAnimeList = [];

// Renderizar lista de favoritos
function renderFavorites() {
  favoritesCont.innerHTML = "";
  //console.log(favoriteAnimeList);

  for (const favoriteAnime of favoriteAnimeList) {
    favoritesCont.innerHTML += `<div class="favorite-anime">
      <h4>${favoriteAnime.title}</h4>
      <img src="${favoriteAnime.images.jpg.image_url}" alt="Imagem de ${favoriteAnime.title}">
    </div>`;
  }
  console.log(animeList);
}

//Manipular a adição de favorito
function handleAddFavorite(event) {
  const idSerieClicked = event.currentTarget.id;

  console.log(animeList);

  // procurar a serie clickada a partir do ID
  const seriesSelected = animeList.find((serie) => {
    console.log(serie.mal_id);
    console.log(idSerieClicked);
    return serie.mal_id === parseInt(idSerieClicked);
  });
  //console.log(seriesSelected);
  // Verifica se a série já está na lista de favoritos para evitar duplicatas
  const isAlreadyFavorite = favoriteAnimeList.some(
    (fav) => fav.mal_id === parseInt(idSerieClicked)
  );

  if (!isAlreadyFavorite) {
    // Adicionar a série à lista de favoritos
    favoriteAnimeList.push(seriesSelected);
  }

  // Adiciona ou remove a classe 'favorite' para indicar visualmente a marcação
  event.currentTarget.classList.toggle("favorite");

  // Atualiza a lista de favoritos na tela
  renderFavorites();
}

//função handlesearch

function handleSearch() {
  const inputValue = inputSearch.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      animeList = data.data;
      cont.innerHTML = "";

      for (const anime of animeList) {
        let url = anime.images.jpg.image_url;

        // Verifica se a URL é a imagem indesejada e, se for, substitui pela URL do placeholder
        if (
          url ===
          "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
        ) {
          url =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s";
        }

        // Adiciona o HTML para cada anime
        cont.innerHTML += `<div class="js-listOfAnime" id=${anime.mal_id}>
          <h4>${anime.title}</h4>
          <img src="${url}" alt="Imagen de ${anime.title}">
          </div>`;
      }

      // Adiciona evento de click para cada anime
      const allFavAnime = document.querySelectorAll(".js-listOfAnime"); //adicionei class a cada serie para selecionar depois

      for (const animeFavEl of allFavAnime) {
        animeFavEl.addEventListener("click", handleAddFavorite);
      }
    });
}

searchButton.addEventListener("click", handleSearch);

// Função para resetar o estado inicial
function handleReset() {
  inputSearch.value = ""; // Limpa o campo de busca
  cont.innerHTML = ""; // Limpa os resultados de busca
  favoritesCont.innerHTML = ""; // Limpa a lista de favoritos
  animeList = []; // Reseta a lista de animes
  favoriteAnimeList = []; // Reseta a lista de favoritos
}

resetButton.addEventListener("click", handleReset);
