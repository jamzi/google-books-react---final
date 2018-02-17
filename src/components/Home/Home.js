import React from 'react';
import {
  Link
} from 'react-router-dom';

const Home = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/search">Search</Link></li>
      <li><Link to="/recommended">Recommended</Link></li>
    </ul>
  </div>
)

export default Home;
