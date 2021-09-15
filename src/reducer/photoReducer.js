import actionTypes from "./actionTypes";
import { fetchPhotos } from "../reducer/service";
import store from "./store";

const INIT_STATE = {
  fetching: false,
  photos: [],
  error: null,
};

const photoFetchStart = () => ({
  type: actionTypes.START_FETCH,
});

const photoFetchFail = (message) => ({
  type: actionTypes.FAIL_FETCH,
  payload: message,
});

const photoFetchFinish = (photos) => ({
  type: actionTypes.FINISH_FETCH,
  payload: photos,
});

export async function fetchPhotosDispatcher() {
  const { dispatch } = store;
  dispatch(photoFetchStart);
  try {
    const photos = await fetchPhotos();
    dispatch(photoFetchFinish(photos));
  } catch (error) {
    dispatch(photoFetchFail(error.message));
  }
}

export default function photoReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case actionTypes.START_FETCH:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case actionTypes.FINISH_FETCH:
      return {
        ...state,
        fetching: false,
        photos: action.payload,
      };
    case actionTypes.FAIL_FETCH:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
