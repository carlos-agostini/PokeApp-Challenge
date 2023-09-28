/*export function sortData(data, sort) {
  if (sort === "ascendente") {
    return [...data].sort((a, b) => a.localeCompare(b));
  } else if (sort === "descendente") {
    return [...data].sort((a, b) => b.localeCompare(a));
  } else {
    // En caso de que el valor de 'sort' no sea válido, devuelve los datos sin cambios
    return data;
  }
}
*/

// helpers.js

// helpers.js

export function filterDataByType(data, nameFilter, selectedTypes) {
  let filteredData = data;

  if (nameFilter) {
    filteredData = filteredData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (selectedTypes.length > 0) {
    console.log("Selected Types:", selectedTypes);
    filteredData = filteredData.filter((pokemon) => {
      const pokemonTypes = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
      console.log("Pokemon Types:", pokemonTypes);
  
      const matches = selectedTypes.some((selectedType) =>
        pokemonTypes.includes(selectedType)
      );
      console.log("Matches:", matches);
  
      return matches;
    });  
  }

  return filteredData;
}

// Rest of your code...

// Function to filter data based on a filter string
export function filterData(data, filter) {
  if (!filter) {
    return data;
  }

  return data.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(filter.toLowerCase());
  });
}

// Function to sort data based on a sort key
export function sortData(data, sort) {
  if (sort === 'name') {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === '-name') {
    return [...data].sort((a, b) => b.name.localeCompare(a.name));
  }

  return data;
}

