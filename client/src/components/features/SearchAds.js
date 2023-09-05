import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchAds = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchPhrase.trim() !== '') {
      navigate(`/ads/search/${searchPhrase}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search ad"
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />
      <button onClick={handleSearch} type="button" className="btn btn-primary ">
        Search
      </button>
    </div>
  );
};

export default SearchAds;
