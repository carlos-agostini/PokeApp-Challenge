import React, { useState } from 'react';
import useApi from '../utils/useApi';
import { sortData, filterDataByType } from '../utils/helpers';
import Filter from './Filter';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

function PokemonList() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Cantidad de Pokémon a mostrar por página

  const offset = (currentPage - 1) * itemsPerPage;

  const { data: pokemonData, loading, error } = useApi(`/pokemon?offset=${offset}&limit=${itemsPerPage}`);

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('id');
  const [selectedTypes, setSelectedTypes] = useState([]);
  

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleTypeChange = (newTypes) => {
    setSelectedTypes(newTypes);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    // Verifica si hay más Pokémon para mostrar
    const totalPokemonCount = pokemonData?.count || 0;
    if (currentPage < Math.ceil(totalPokemonCount / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { results: allData } = pokemonData;

  const filteredPokemon = filterDataByType(allData, filter, selectedTypes).slice(0, 16);
  const sortedPokemon = sortData(filteredPokemon, sort);

  return (
    <div>
    <header>
    </header>
    <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Filter
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onTypeChange={handleTypeChange}
        selectedTypes={selectedTypes}
      />
      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '10px' }}>
        {/* ... */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
          <button
            onClick={handlePreviousPage}
            className="pagination-button"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="pagination-button"
            disabled={
              !pokemonData || currentPage >= Math.ceil(pokemonData.count / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
      <List
        style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px' }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={(poke) => (
          <List.Item>
            <Link to={`/pokemon/${poke.name}`}>
              <Card
                hoverable
                style={{ borderRadius: '10px', transition: 'all 0.3s ease' }}
                cover={<img alt={poke.name} src={localStorage['pokemon.' + poke.name] || "https://freepngimg.com/download/pokemon/20250-9-pokeball-photo.png"} />}
                bodyStyle={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card.Meta title={poke.name.toUpperCase()} style={{ textAlign: 'center' }} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
    </div>
  );
}

export default PokemonList;
