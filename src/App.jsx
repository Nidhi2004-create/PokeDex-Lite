import React, { useState } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { FavoritesProvider } from './context/FavoritesContext';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonDetailModal from './components/PokemonDetailModal';
import './index.css';

function App() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const limit = 20;

  const { pokemon, loading, error, types, totalPages } = usePokemon({
    query,
    type,
    page,
    limit,
  });

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // Reset to page 1 on search
  };

  const handleTypeSelect = (newType) => {
    setType(newType);
    setPage(1); // Reset to page 1 on filter
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(p => p + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  return (
    <FavoritesProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="logo">Pokédex <span>Lite</span></h1>
            <div className="controls">
              <SearchBar query={query} setQuery={handleSearch} />
              <TypeFilter types={types} selectedType={type} onTypeSelect={handleTypeSelect} />
            </div>
          </div>
        </header>

        <main className="main-content">
          <PokemonList 
            pokemon={pokemon} 
            loading={loading} 
            error={error} 
            onPokemonClick={setSelectedPokemon} 
          />

          {!loading && !error && pokemon.length > 0 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                onClick={handlePrevPage} 
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="page-info">
                Page {page} of {totalPages || 1}
              </span>
              <button 
                className="page-btn" 
                onClick={handleNextPage} 
                disabled={page === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          )}
        </main>

        {selectedPokemon && (
          <PokemonDetailModal 
            pokemon={selectedPokemon} 
            onClose={() => setSelectedPokemon(null)} 
          />
        )}
      </div>
    </FavoritesProvider>
  );
}

export default App;
