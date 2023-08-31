import { editAd } from '../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdForm from './AdForm';
import { useSelector } from 'react-redux';
import { getAdById } from '../../redux/adsRedux';
import { useParams } from 'react-router';

const EditAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const ad = useSelector((state) => getAdById(state, id));

  const handleSubmit = (ad) => {
    dispatch(editAd({ ...ad, id }));
    navigate('/');
  };

  if (!ad) return <Navigate to="/" />;
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
