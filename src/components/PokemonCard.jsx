import React, { useContext, useEffect, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function PokemonCard({ pokemon, onClick }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const favorite = isFavorite(pokemon.name);
  const [scatterStyle, setScatterStyle] = useState({});

  useEffect(() => {
    // Generate random scatter values when card mounts
    const randomX = (Math.random() - 0.5) * 400; // -200px to 200px
    const randomY = (Math.random() - 0.5) * 400; // -200px to 200px
    const randomRot = (Math.random() - 0.5) * 90; // -45deg to 45deg
    const delay = Math.random() * 0.4; // 0 to 0.4s delay

    setScatterStyle({
      '--start-x': `${randomX}px`,
      '--start-y': `${randomY}px`,
      '--start-rot': `${randomRot}deg`,
      animationDelay: `${delay}s`
    });
  }, []);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  const mainType = pokemon.types[0];
  const bgColor = typeColors[mainType] || '#777';

  return (
    <div 
      className="pokemon-card animate-scatter" 
      onClick={() => onClick(pokemon)} 
      style={{ '--bg-color': bgColor, ...scatterStyle }}
    >
      <div className="card-header">
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
        <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={handleFavorite}>
          {favorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="card-image-container">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" loading="lazy" />
      </div>
      <div className="card-info">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map(type => (
            <span key={type} className="type-badge" style={{ backgroundColor: typeColors[type] || '#777' }}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
