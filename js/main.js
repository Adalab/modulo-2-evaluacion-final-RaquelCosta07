"use strict";

/* passos
- selecciono os elementos HTML: input, botao  FEITO
- recolho a info do que a usuaria escreve no input 
- quando a usuaria fizer click no botao "buscar" - evento
    - faço um fetch ao servidor
    - Procuro ver se a info na minha API coincide com o que a usuaria escreveu com o metodo filter:
        - se estiver, pinto na web as series que coinciden
        - se nao, imagem placeholder ou NOT FOUND --> CONDICIONAL IF-ELSE

*/
const inputSearch = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-button");
const results = document.querySelector(".js-results");
const cont = document.querySelector(".container");
let animeList = [];

const renderSeries = (series) => {
  for (const serie of series) {
    let urlImage = anime.images.jpg.image_url;
    results.innerHTML += `<div class="listOfAnime">
          <h5>${serie.title}</h5>
          <img src="${urlImage}">
          
          </div>
        `;
  }
  console.log(urlImage);
};

function handleSearch() {
  const inputValue = inputSearch.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      const animes = data.data;
      cont.innerHTML = "";

      for (const anime of animes) {
        //console.log(anime);

        const urlImage =
          anime.images.jpg.image_url ===
          "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
            ? "https://via.placeholder.com/210x295/ffffff/666666/?text=not%20found"
            : anime.images.jpg.image_url;
      }
    });
}

searchButton.addEventListener("click", handleSearch);
