import { useSelector } from 'react-redux';
import { getAdById } from '../../redux/adsRedux';
import { useParams } from 'react-router';
import { Link, Navigate } from 'react-router-dom';
import { removeCard } from '../../redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DateToStr from '../../utils/dateToStr';
import { IMGS_URL, API_URL } from '../../config';
import { getUser } from '../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Ad = (props) => {
  const { adId } = useParams();
  const ad = useSelector((state) => getAdById(state, adId));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const deleteAd = (e) => {
    e.preventDefault();

    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${API_URL}/ads/:id`, options).then(() => {
      dispatch(removeCard(ad.id));
      setTimeout(() => {
        navigate('/');
      }, 10);
    });
  };

  if (!ad) return <Navigate to="/" />;
  return (
    <div>
      <div className="card d-flex flex-row w-75 border-0 m-auto">
        <div className="card-body">
          <h3 className="card-title">{ad.title}</h3>
          <p>
            <span className="fw-bold">Date of publication: </span>
            {DateToStr(ad.dateOfPublication)}
          </p>
          <p>
            <span className="fw-bold">Price:</span> {ad.price}
          </p>
          <p>
            <span className="fw-bold">Location:</span> {ad.location}
          </p>
          <p>
            <span className="fw-bold">Seller:</span> {ad.seller.login} Phone:{' '}
            {ad.seller.phone}
          </p>
          <img src={IMGS_URL + ad.seller.avatar} alt="" />
          <p dangerouslySetInnerHTML={{ __html: ad.content }} />
          <img
            src={IMGS_URL + ad.photo}
            alt=""
            style={{ width: '80%', height: '200px', objectFit: 'cover' }}
          />
        </div>
        {user && user.login === ad.seller.login && (
          <div>
            <Link to={'/ad/edit/' + ad.id}>
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

      {showModal && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                This operation will completely remove this post from the app.
                Are you sure you want to do that?
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
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
};

export default Ad;
