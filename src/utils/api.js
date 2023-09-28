export async function fetchData(endpoint) {
  return fetch(`https://pokeapi.co/api/v2${endpoint}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export async function fetchPokemonByType(type) {
  return fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}
