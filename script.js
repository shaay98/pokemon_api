"use strict"

const shuffleBtn = document.getElementById("shuffleBtn")
const pokemonList = document.getElementById("pokemonList")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const searchResult = document.getElementById("searchResult")
const favoriteList = document.getElementById("favoriteList")
const favoritesFromLocalStorage = localStorage.getItem ("favorites");
let favorites = JSON.parse(favoritesFromLocalStorage);

async function fetchPokemonList(){
    let offset = Math.floor(Math.random()*(800 - 20));
    pokemonList.innerHTML = "<p> Loading Pokemon..</p>";
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=2-&offset=" + offset,
        );
        const data = await response.json();
        console.log(data);
        pokemonList.innerHTML ="";
        
        data.result.forEach((pokemon) => {
            const li = document.createElement("li");
            li.className = "cursor-pointer bg-gray-100 p-2 rounded";
            li.innerText = pokemon.name;
            pokemonList.appendChild(li);
        });
    } catch (error) {
        pokemonList.innerHTML = "<p> Failed to load Pokemon :( </p>";
    }
}
fetchPokemonList();

async function fetchPokemonByName(name) {
    try {
        const response = await response.json();
        console.log(data);
    } catch (error) {
        searchResult.innerHTML = `<p class="text-red-500"> Pokemon Not found! </p>`;
    }
}
fetchPokemonByName("fletchinder");
function displaySearchedPokemon(pokemon) {
    searchResult.innerHTML = `
    <div class="flex items-center gap-4 p-4 bg-gray-100 rounded-xl mt-4">
    <img
    src="${pokemon.sprites.font_default}"
    alt="${pokemon.name}"
    class="w-16 h-16"
    />
    <div>
    <h3 class="text-lg font-semibold">${pokemon.name} (#${pokemon.id})</h3>
    <button id="addFavBtn"
    class="bg-green-500 text-white px-3 py-1 rounded mt-2">
    Add to Favorites
    </button>
    </div>
    </div>`;
}
searchBtn.addEventListener("click",()=> {
    const searchText = searchInput.ariaValueMax.trim()
    if (searchText !== ""){
        fetchPokemonByName(searchText)
    }
})
searchInput.addEventListener("keypress", (event)=> {
    if (event.key ==="Enter"){
        searchBtn.click();
    }
})
shuffleBtn.addEventListener("click", fetchPokemonList);