import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import { Container, Spinner } from 'react-bootstrap';
import Footer from './components/views/Footer';
import Header from './components/views/Header';
import Ad from './components/pages/Ad';
import AdAdd from './components/pages/AdAdd';
import AdEdit from './components/pages/AdEdit';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import SearchResults from './components/pages/SearchResults';
import { fetchAds, getAdsLoading } from './redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getAdsLoading);

  useEffect(() => dispatch(fetchAds()), [dispatch]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center">
        <div
          className="d-flex align-items-center"
          style={{ marginTop: '250px' }}
        >
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }


  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads/:adId" element={<Ad />} />
        <Route path="/ad/add" element={<AdAdd />} />
        <Route path="/ad/edit/:id" element={<AdEdit />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/logout" element={<Logout />} />
        <Route path="/ads/search/:searchPhrase" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
