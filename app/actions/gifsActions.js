import axios from 'axios';

import {
  GIFS_FETCH_BEGINS,
  GIFS_FETCH_FINISHED,
} from '../constants/gifsActionTypes';


export const fetchGifsBegins = () => ({
  type: GIFS_FETCH_BEGINS,
});

export const fetchGifsFinished = data => ({
  type: GIFS_FETCH_FINISHED,
  data,
});

export const fetchGifs = params => (dispatch) => {
  dispatch(fetchGifsBegins());

  return axios
    .get('gifs/', { params })
    .then((response) => {
      dispatch(fetchGifsFinished(response.data));
      return response;
    });
};
