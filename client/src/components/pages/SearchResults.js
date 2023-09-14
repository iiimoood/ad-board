import React from 'react';
import { useParams } from 'react-router-dom';
import { IMGS_URL } from '../../config';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllAds } from '../../redux/adsRedux';

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const ads = useSelector(getAllAds);
  const lowerLetterPhrase = searchPhrase.toLowerCase();

  const filteredAds =
    ads && ads.data
      ? Object.values(ads.data).filter(
          (ad) =>
            ad.title.toLowerCase().includes(lowerLetterPhrase) ||
            ad.content.toLowerCase().includes(lowerLetterPhrase) ||
            ad.location.toLowerCase().includes(lowerLetterPhrase)
        )
      : [];

  if (filteredAds.length === 0) {
    return (
      <div>
        <h1>The search phrase is: {searchPhrase}</h1>
        <h2>No ads with this phrase.</h2>
      </div>
    );
  } else
    return (
      <div>
        <h2>Search results for {searchPhrase}</h2>
        <div>
          <section className="d-flex flex-wrap justify-content-between mr-1">
            {filteredAds.map((ad) => (
              <article
                key={ad.id}
                className="card col-12 col-md-6 col-lg-4 row"
              >
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
