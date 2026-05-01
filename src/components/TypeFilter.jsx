import React from 'react';

export default function TypeFilter({ types, selectedType, onTypeSelect }) {
  return (
    <div className="type-filter">
      <select
        value={selectedType}
        onChange={(e) => onTypeSelect(e.target.value)}
        className="type-select"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
