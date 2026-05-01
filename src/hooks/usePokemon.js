import { useState, useEffect, useMemo } from 'react';

const CACHE = {};

export function usePokemon({ query, type, page, limit }) {
  const [baseList, setBaseList] = useState([]);
  const [typeList, setTypeList] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  // Fetch all types for the filter dropdown
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/type');
        const data = await res.json();
        // Ignore 'unknown' and 'shadow' types
        setTypes(data.results.filter(t => t.name !== 'unknown' && t.name !== 'shadow'));
      } catch (err) {
        console.error('Failed to fetch types', err);
      }
    };
    fetchTypes();
  }, []);

  // Fetch base list (all pokemon) once
  useEffect(() => {
    const fetchBase = async () => {
      try {
        if (CACHE.baseList) {
          setBaseList(CACHE.baseList);
          return;
        }
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await res.json();
        CACHE.baseList = data.results;
        setBaseList(data.results);
      } catch (err) {
        setError('Failed to fetch Pokemon data');
      }
    };
    fetchBase();
  }, []);

  // Fetch list by type when type changes
  useEffect(() => {
    if (!type) {
      setTypeList(null);
      return;
    }
    const fetchType = async () => {
      try {
        if (CACHE[`type_${type}`]) {
          setTypeList(CACHE[`type_${type}`]);
          return;
        }
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
        const formatted = data.pokemon.map(p => p.pokemon);
        CACHE[`type_${type}`] = formatted;
        setTypeList(formatted);
      } catch (err) {
        setError('Failed to fetch type data');
      }
    };
    fetchType();
  }, [type]);

  // Combine filters, slice, and fetch details
  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let currentList = baseList;
        
        // Apply type filter
        if (type && typeList) {
          currentList = typeList;
        } else if (type && !typeList) {
          // Type selected but not loaded yet
          return;
        }

        // Apply search filter
        if (query) {
          currentList = currentList.filter(p => p.name.includes(query.toLowerCase()));
        }

        // Pagination slice
        const offset = (page - 1) * limit;
        const paginatedList = currentList.slice(offset, offset + limit);

        // Fetch details
        const detailedData = await Promise.all(
          paginatedList.map(async (p) => {
            if (CACHE[`detail_${p.name}`]) return CACHE[`detail_${p.name}`];
            const res = await fetch(p.url);
            const data = await res.json();
            const detail = {
              id: data.id,
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
              types: data.types.map(t => t.type.name),
              stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
              weight: data.weight,
              height: data.height,
              abilities: data.abilities.map(a => a.ability.name)
            };
            CACHE[`detail_${p.name}`] = detail;
            return detail;
          })
        );

        setPokemon(detailedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Pokemon details');
        setLoading(false);
      }
    };

    if (baseList.length > 0) {
      loadDetails();
    }
  }, [baseList, typeList, type, query, page, limit]);

  // Calculate total pages
  const totalItems = useMemo(() => {
    let currentList = baseList;
    if (type && typeList) currentList = typeList;
    if (query) currentList = currentList.filter(p => p.name.includes(query.toLowerCase()));
    return currentList.length;
  }, [baseList, typeList, type, query]);

  const totalPages = Math.ceil(totalItems / limit);

  return { pokemon, loading, error, types, totalPages };
}
