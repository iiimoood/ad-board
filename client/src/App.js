import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import { Container } from 'react-bootstrap';
import Footer from './components/views/Footer';
import Header from './components/views/Header';
import Ad from './components/pages/Ad';
import AdAdd from './components/pages/AdAdd';
import AdEdit from './components/pages/AdEdit';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads/:adId" element={<Ad />} />
        <Route path="/ad/add" element={<AdAdd />} />
        <Route path="/ad/edit/:id" element={<AdEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;