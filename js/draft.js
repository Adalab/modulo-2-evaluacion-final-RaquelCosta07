"use strict";

const inputSearch = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-button");
const results = document.querySelector(".js-results");
const cont = document.querySelector(".container");

let animeList = [];

function handleSearch() {
  const inputValue = inputSearch.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      const animes = data.data;
      cont.innerHTML = "";

      for (const anime of animes) {
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
        cont.innerHTML += `<div class="js-listOfAnime">
          <h5>${anime.title}</h5>
          <img src="${url}" alt="Imagem de ${anime.title}">
          </div>`;

        console.log(url); // Para depuração
      }

      const AllFavAnime = document.querySelectorAll(".js-listOfAnime"); //adicionei class a cada serie para selecionar depois

      for (const favoriteAnime of AllFavAnime) {
        favoriteAnime.addEventListener("click", handleAddFavorite);
      }
    });

  //localStorage.setItem("seriesInfo", JSON.stringify(data.series));
}

/*
3. Marcar series como preferidas
- Cuando la usuaria haga click en una serie,
- tengo que saber qué serie ha clickado
- voy a añadir esa serie a la lista de series favoritas a la izquierda
- pinto las series favoritas a la izquierda y nunca se borran
*/

function handleAddFavorite() {
  console.log("click en una serie");
}

searchButton.addEventListener("click", handleSearch);
