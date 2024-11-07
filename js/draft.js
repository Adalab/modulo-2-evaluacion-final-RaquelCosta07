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
          url = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        }

        // Adiciona o HTML para cada anime
        cont.innerHTML += `<div class="listOfAnime">
          <h5>${anime.title}</h5>
          <img src="${url}" alt="Imagem de ${anime.title}">
          </div>`;

        console.log(url); // Para depuração
      }
    });

  //localStorage.setItem("seriesInfo", JSON.stringify(data.series));
}

searchButton.addEventListener("click", handleSearch);
