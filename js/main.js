"use strict";

/* passos
- selecciono os elementos HTML: input, botao
- recolho a info do que a usuaria escreve no input
- quando a usuaria fizer click no botao "buscar" - evento
    - faço um fetch ao servidor
    - Procuro ver se a info na minha API coincide com o que a usuaria escreveu com o metodo filter:
        - se estiver, pinto na web as series que coinciden
        - se nao, imagem placeholder ou NOT FOUND --> CONDICIONAL IF-ELSE

*/
const inputSearch = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-button");
let animeList = [];

fetch("https://api.jikan.moe/v4/anime?q=naruto")
  .then((response) => response.json())
  .then((data) => {
    animeList = data.series;
    localStorage.setItem("seriesInfo", JSON.stringify(data.series));
    console.log(data.series);
  });

function handleSearch() {
  const inputValue = inputSearch.value;
  //aplico o metodo funcional 'filter'
  const filteredSeries = seriesList.filter((series) => {
    return series.title.toLowerCase().includes(inputValue.toLowerCase());
  });

  list.innerHtml = "";
}

searchButton.addEventListener("click", handleSearch);
