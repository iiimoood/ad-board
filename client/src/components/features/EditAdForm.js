import { editAd } from '../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdForm from './AdForm';
import { useSelector } from 'react-redux';
import { getAdById } from '../../redux/adsRedux';
import { useParams } from 'react-router';
import { getUser } from '../../redux/usersRedux';
import { API_URL } from '../../config';

const EditAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(getUser);

  const ad = useSelector((state) => getAdById(state, id));

  const handleSubmit = (ad) => {
    const options = {
      method: 'PUT',
      body: ad,
      credentials: 'include',
    };

    fetch(`${API_URL}/ads/:id`, options).then(() => {
      dispatch(editAd({ ...ad, id }));
      setTimeout(() => {
        navigate('/');
      }, 10);
    });
    return () => {};
  };

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
