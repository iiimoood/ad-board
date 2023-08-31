import { useSelector } from 'react-redux';
import { getAllAds } from '../../redux/adsRedux';
import { NavLink } from 'react-router-dom';
import IMGS_URL from '../../../config';

const Ads = () => {
  const ads = useSelector(getAllAds);
  return (
    <div className="d-flex flex-wrap justify-content-between mr-1">
      {ads.map((ad) => (
        <div key={ad.id} className="card col-12 col-md-6 col-lg-4 row">
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
        </div>
      ))}
    </div>
  );
};

export default Ads;