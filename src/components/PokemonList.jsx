import React from 'react';
import PokemonCard from './PokemonCard';

export default function PokemonList({ pokemon, loading, error, onPokemonClick }) {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Catching Pokémon...</p>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="empty-state">
        <p>No Pokémon found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={onPokemonClick} />
      ))}
    </div>
  );
}
