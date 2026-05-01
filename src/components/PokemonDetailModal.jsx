import React, { useEffect } from 'react';

export default function PokemonDetailModal({ pokemon, onClose }) {
  // Prevent scrolling on background when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2 className="modal-title">{pokemon.name} <span className="modal-id">#{String(pokemon.id).padStart(3, '0')}</span></h2>
        </div>

        <div className="modal-body">
          <div className="modal-image-container">
            <img src={pokemon.image} alt={pokemon.name} className="modal-image" />
          </div>

          <div className="modal-details">
            <div className="modal-types">
              {pokemon.types.map(type => (
                <span key={type} className={`type-badge type-${type}`}>
                  {type}
                </span>
              ))}
            </div>

            <div className="modal-physical">
              <div className="physical-stat">
                <span className="stat-label">Height</span>
                <span className="stat-value">{pokemon.height / 10} m</span>
              </div>
              <div className="physical-stat">
                <span className="stat-label">Weight</span>
                <span className="stat-value">{pokemon.weight / 10} kg</span>
              </div>
            </div>

            <div className="modal-abilities">
              <h3 className="section-title">Abilities</h3>
              <div className="abilities-list">
                {pokemon.abilities.map(ability => (
                  <span key={ability} className="ability-badge">{ability.replace('-', ' ')}</span>
                ))}
              </div>
            </div>

            <div className="modal-stats">
              <h3 className="section-title">Base Stats</h3>
              {pokemon.stats.map(stat => (
                <div key={stat.name} className="stat-row">
                  <span className="stat-name">{stat.name.replace('-', ' ')}</span>
                  <div className="stat-bar-bg">
                    <div 
                      className="stat-bar-fill" 
                      style={{ width: `${Math.min(stat.value, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-value-number">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
