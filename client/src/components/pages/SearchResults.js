import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMGS_URL, API_URL } from '../../config';
import { NavLink } from 'react-router-dom';

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/ads?search=${searchPhrase}`);
        if (response.ok) {
          const data = await response.json();
          setAds(data);
        } else {
          console.error('Error fetching search results');
        }
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    };

    fetchData();
  }, [searchPhrase]);

  return (
    <div>
      <h2>Search results for {searchPhrase}</h2>
      <div>
        <section className="d-flex flex-wrap justify-content-between mr-1">
          {ads.map((ad) => (
            <article key={ad.id} className="card col-12 col-md-6 col-lg-4 row">
              <div className="card-body">
                <h3 className="card-title">{ad.title}</h3>
                <p>
                  <span className="fw-bold">Location:</span> {ad.location}
                </p>
                <img src={IMGS_URL + ad.photo} alt="" />
                <button type="button" className="btn btn-primary ">
                  <NavLink
                    to={'/ads/' + ad.id}
                    className="text-decoration-none text-light"
                  >
                    Read more
                  </NavLink>
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SearchResults;
