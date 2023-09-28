import React, { useState, useEffect } from 'react';
import useApi from '../utils/useApi';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';
import { Select } from 'antd';

function PokemonList() {

  const { Option } = Select;

  const { data: pokemonData, loading, error } = useApi(`/pokemon?offset=0&limit=1000`);

  const [filteredPokemon, setFilteredPokemon] = useState([]);
  
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('id');
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Cantidad de Pokémon a mostrar por página
  const totalPages = Math.ceil((pokemonData?.count || 0) / itemsPerPage);

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
    const totalPokemonCount = filteredPokemon.length;
    if (currentPage < Math.ceil(totalPokemonCount / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };  


  useEffect(() => {
    // Filtra los Pokémon en base a los filtros actuales
    const allData = pokemonData?.results || [];
    setFilteredPokemon(filterData(allData, filter, selectedTypes));
  }, [pokemonData?.results, filter, selectedTypes]);


  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const sortedPokemon = sortData(paginatedPokemon, sort);

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
          <Select
            style={{ margin: '0 10px' }}
            value={currentPage}
            onChange={handleChangePage}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <Option key={index + 1} value={index + 1}>
                Page {index + 1}
              </Option>
            ))}
          </Select>
          <button
            onClick={handleNextPage}
            className="pagination-button"
            disabled={
              !pokemonData || currentPage >= totalPages
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
