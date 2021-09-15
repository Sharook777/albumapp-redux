import actionTypes from "./actionTypes";
import store from "./store.js";
import { fetchAlbums } from "./service";

const INIT_STATE = {
  fetching: false,
  albums: [],
  error: null,
};

const albumFetchStart = () => ({
  type: actionTypes.START_FETCH,
});

const albumFetchFail = (message) => ({
  type: actionTypes.FAIL_FETCH,
  payload: message,
});

const albumFetchFinish = (albums) => ({
  type: actionTypes.FINISH_FETCH,
  payload: albums,
});

export async function fetchAlbumsDispatcher() {
  const { dispatch } = store;
  dispatch(albumFetchStart);
  try {
    const albums = await fetchAlbums();
    dispatch(albumFetchFinish(albums));
  } catch (error) {
    dispatch(albumFetchFail(error.message));
  }
}

export default function albumReducer(state = INIT_STATE, action) {
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
        albums: action.payload,
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
