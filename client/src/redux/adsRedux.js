//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, adId) => ads.find((ad) => ad.id === adId);

// actions
const createActionName = (actionName) => `app/posts/${actionName}`;
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

// action creators
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const removeCard = (payload) => ({
  type: REMOVE_AD,
  payload,
});

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case REMOVE_AD:
      return statePart.filter((ad) => ad.id !== action.payload);
    case ADD_AD:
      return [...statePart, { ...action.payload }];
    case EDIT_AD:
      return statePart.map((ad) =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    default:
      return statePart;
  }
};

export default adsReducer;
