import { API_URL } from '../config';

const initialState = {
  data: [],
  loading: false,
};

//selectors
export const getAllAds = ({ ads }) => ads.data;
export const getAdById = ({ ads }, adId) =>
  ads.data.find((ad) => ad.id === adId);
export const getAdsLoading = ({ ads }) => ads.loading;

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');
const UPDATE_ADS = createActionName('UPDATE_ADS');
const FETCH_ADS_REQUEST = createActionName('FETCH_ADS_REQUEST');

// action creators
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const removeCard = (payload) => ({
  type: REMOVE_AD,
  payload,
});
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
export const fetchAdsRequest = () => ({
  type: FETCH_ADS_REQUEST,
});

export const fetchAds = () => {
  return (dispatch) => {
    dispatch(fetchAdsRequest());
    fetch(`${API_URL}/ads`)
      .then((res) => res.json())
      .then((ads) => dispatch(updateAds(ads)));
  };
};

const adsReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case REMOVE_AD:
      return {
        ...statePart,
        data: statePart.data.filter((ad) => ad.id !== action.payload),
      };
    case ADD_AD:
      return {
        ...statePart,
        data: [...statePart.data, { ...action.payload }],
      };
    case EDIT_AD:
      return {
        ...statePart,
        data: statePart.data.map((ad) =>
          ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
        ),
      };
    case FETCH_ADS_REQUEST:
      return {
        ...statePart,
        loading: true,
      };
    case UPDATE_ADS:
      return {
        ...statePart,
        data: [...action.payload],
        loading: false,
      };
    default:
      return statePart;
  }
};

export default adsReducer;
