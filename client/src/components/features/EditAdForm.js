import { editAd } from '../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdForm from './AdForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getUser } from '../../redux/usersRedux';
import { API_URL } from '../../config';
import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { fetchAds } from '../../redux/adsRedux';

const EditAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(getUser);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${API_URL}/ads/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setAd(data);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (ad) => {
    const options = {
      method: 'PUT',
      body: ad,
      credentials: 'include',
    };

    fetch(`${API_URL}/ads/${id}`, options).then(() => {
      dispatch(editAd({ ...ad, id }));
      setTimeout(() => {
        navigate('/');
      }, 10);
      dispatch(fetchAds());
    });
    return () => {};
  };

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

  if (!ad || ad.seller.login !== user.login) return <Navigate to="/" />;
  return (
    <AdForm
      action={handleSubmit}
      actionText="Edit ad"
      title={ad.title}
      dateOfPublication={ad.dateOfPublication}
      price={ad.price}
      location={ad.location}
      seller={ad.seller}
      content={ad.content}
      photo={ad.photo}
    />
  );
};

export default EditAdForm;
