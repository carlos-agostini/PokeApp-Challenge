import React, {useEffect} from 'react';
import useApi from '../utils/useApi'; // Importa el hook personalizado
import { Card } from 'antd';

function PokemonDetail(props) {
  const { match, onHideResetButton  } = props; // Obtén la prop onShowResetButton
  const { data: pokemon, loading, error } = useApi(`/pokemon/${match.params.id}`); // Utiliza el hook personalizado
  localStorage.setItem('pokemon.'+ ((match || {}).params || {}).id, ((pokemon || {}).sprites || {}).front_default);

  useEffect(() => {
    onHideResetButton(); // Llama a la función para mostrar el botón cuando se monta el componente
    return () => {
      // Llama a onHideResetButton cuando se desmonta el componente (al salir de la página de detalles)
      if (props.onShowResetButton) {
        props.onShowResetButton();
      }
    };
  }, [onHideResetButton, props]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!pokemon) {
    return <div>Pokemon not found...</div>;
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card 
        style={{ width: 300 }}
        cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
      >
        <Card.Meta 
          title={pokemon.name.toUpperCase()} 
          description={
            <>
              <p>Height: {pokemon.height/10} m</p>
              <p>Weight: {pokemon.weight/10} kg</p>
              <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
            </>
          }
        />
      </Card>
    </div>
  );
}

export default PokemonDetail;