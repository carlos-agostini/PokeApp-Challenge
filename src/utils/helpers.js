// helpers.js

export function filterDataByType(data, nameFilter, selectedTypes) {
  let filteredData = data;

  if (nameFilter) {
    filteredData = filteredData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (selectedTypes.length > 0) {
    filteredData = filteredData.filter((pokemon) => {
      const pokemonTypes = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
      const matches = selectedTypes.every((selectedType) =>
        pokemonTypes.includes(selectedType)
      );

      return matches;
    });
  }

  return filteredData;
}


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

