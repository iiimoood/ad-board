import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, Navigate } from 'react-router-dom';
import { removeCard, fetchAds } from '../../redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import DateToStr from '../../utils/dateToStr';
import { IMGS_URL, API_URL } from '../../config';
import { getUser } from '../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Ad = () => {
  const { adId } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (adId) {
      setLoading(true);
      fetch(`${API_URL}/ads/${adId}`)
        .then((res) => res.json())
        .then((data) => {
          setAd(data);
          setLoading(false);
        });
    }
  }, [adId]);

  const deleteAd = (e) => {
    e.preventDefault();

    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${API_URL}/ads/${adId}`, options).then(() => {
      dispatch(removeCard(ad.id));
      setTimeout(() => {
        navigate('/');
      }, 10);
      dispatch(fetchAds());
    });
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

  if (!ad) return <Navigate to="/" />;
  return (
    <div>
      <div className="card d-flex flex-row w-75 border-0 m-auto">
        <div className="card-body">
          <h3 className="card-title">{ad.title}</h3>
          <div className="d-flex column">
            <div className="w-50">
              <p>
                <span className="fw-bold">Date of publication: </span>
                {DateToStr(new Date(ad.dateOfPublication))}
              </p>
              <p>
                <span className="fw-bold">Price:</span> {ad.price}
              </p>
              <p>
                <span className="fw-bold">Location:</span> {ad.location}
              </p>
            </div>
            <div className="d-flex column w-50 justify-content-center">
              <img
                src={IMGS_URL + ad.seller.avatar}
                alt=""
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  marginRight: '20px',
                }}
              />
              <p className="d-flex align-content-center row">
                <span className="fw-bold">{ad.seller.login}</span>
                <span>{ad.seller.phone}</span>
              </p>
            </div>
          </div>

          <p dangerouslySetInnerHTML={{ __html: ad.content }} />
          <img
            src={IMGS_URL + ad.photo}
            alt=""
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </div>
        {user && user.login === ad.seller.login && (
          <div>
            <Link to={'/ad/edit/' + ad._id}>
              <button type="button" className="btn btn-outline-primary me-2">
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            This operation will completely remove this post from the app. Are
            you sure you want to do that?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteAd}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Ad;
