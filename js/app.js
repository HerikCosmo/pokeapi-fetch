const ul = document.getElementById('pokemons')
const div = document.getElementById('pokemons')
const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'

let pokemonList = []

for(i = 1; i <= 151; i++){
    pokemonList.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(pokemon => pokemon.json()))
}


Promise.all(pokemonList)
    .then(pokemonList => {
        return pokemonList.map(pokemon => {
            return {id: pokemon.id, name: pokemon.name, img: pokemon.sprites.other['official-artwork'].front_default, type: pokemon.types[0].type.name} 
        })
    })
    .then(pokemons => {
        pokemons.forEach(pokemon => {
            addPokemon(pokemon)
        })
    })
    .catch(err => {
        div.innerHTML = err
    })
    
function addPokemon(pokemon){
    div.innerHTML += `<div class='card ${pokemon.type}'><img src='${pokemon.img}' width=128><span>${pokemon.id}. ${pokemon.name}</span></div>`
}
