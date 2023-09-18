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
    <div className="col-12 col-sm-3 mx-auto d-flex align-items-center justify-content-between">
      <input
        type="text"
        placeholder="Search ad"
        value={searchPhrase}
        style={{
          height: '40px',
          marginRight: '10px',
        }}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />
      <button onClick={handleSearch} type="button" className="btn btn-primary ">
        Search
      </button>
    </div>
  );
};

export default SearchAds;
