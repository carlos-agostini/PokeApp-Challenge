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


export function filterDataByName(data, nameFilter) {
  if (!nameFilter) {
    return data;
  }

  return data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
}

export function filterData(data, nameFilter, selectedTypes) {
  let filteredData = data;

  filteredData = filterDataByName(filteredData, nameFilter);

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



// Function to sort data based on a sort key
export function sortData(data, sort) {
  if (sort === 'name') {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === '-name') {
    return [...data].sort((a, b) => b.name.localeCompare(a.name));
  }

  return data;
}

