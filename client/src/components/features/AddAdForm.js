import { useDispatch } from 'react-redux';
import { addAd, fetchAds } from '../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import AdForm from './AdForm';
import { API_URL } from '../../config';

const AddAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (ad) => {
    const options = {
      method: 'POST',
      body: ad,
    };

    fetch(`${API_URL}/ads`, options).then((res) => {
      dispatch(addAd(ad));
      navigate('/');
      dispatch(fetchAds());
    });
  };

  return <AdForm action={handleSubmit} actionText="Add ad" />;
};

export default AddAdForm;
