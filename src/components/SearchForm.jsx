import React from 'react';

function SearchForm({ city, onCityChange, onSearch, loading }) {
  const isInputEmpty = !city.trim();

  return (
    <form className="search-panel p-3 p-sm-4 shadow-sm" onSubmit={onSearch}>
      <label htmlFor="city-search" className="form-label fw-semibold">
        City name
      </label>
      <div className="input-group">
        <input
          id="city-search"
          className="form-control form-control-lg"
          type="text"
          placeholder="For example, London, Tokyo, Bengaluru"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          autoComplete="address-level2"
          disabled={loading}
          aria-label="City name"
        />
        <button
          className="btn btn-primary px-4 fw-medium"
          type="submit"
          disabled={loading || isInputEmpty}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              />
              Searching...
            </>
          ) : (
            'Search'
          )}
        </button>
      </div>
      <div className="form-text mt-2 text-secondary">
        Enter a city to find its current conditions.
      </div>
    </form>
  );
}

export default SearchForm;
