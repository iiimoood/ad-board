import { NavLink } from 'react-router-dom';
import Ads from '../features/Ads';
import SearchAds from '../features/SearchAds';

const Home = () => {
  return (
    <div>
      <span className="row me-1 mb-3">
        <SearchAds />
        <h1 className="col-9 col-md-10 col-xl-11">All ads</h1>
        <button
          type="button"
          className="btn btn-outline-primary col-3 col-md-2 col-xl-1"
        >
          <NavLink to="/ad/add" className="text-decoration-none">
            Add ad
          </NavLink>
        </button>
      </span>
      <Ads />
    </div>
  );
};

export default Home;
