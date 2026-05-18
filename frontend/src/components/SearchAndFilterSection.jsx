import React from 'react';

function SearchAndFilterSection({ filter, setFilter, search, reset }) {
  return (
    <section className="card">
      <h2>Search & Filter Section</h2>
      <div className="row">
        <input 
          placeholder="Department e.g. Development" 
          value={filter} 
          onChange={e => setFilter(e.target.value)}
        />
        <button onClick={search}>Search</button>
        <button onClick={reset}>Reset</button>
      </div>
    </section>
  );
}

export default SearchAndFilterSection;
