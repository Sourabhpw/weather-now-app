import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container">
        <a className="navbar-brand fw-semibold" href="/" aria-label="Weather Now home">
          <span className="brand-mark me-2" aria-hidden="true">
            W
          </span>
          Weather Now
        </a>
        <span className="navbar-text small text-secondary d-none d-sm-inline">
          Simple, up-to-date forecasts
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
