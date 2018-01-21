import {
  Map,
  List,
  fromJS,
} from 'immutable';

import {
  renameKeys
} from '../utils';

import {
  GIFS_FETCH_BEGINS,
  GIFS_FETCH_FINISHED,
} from '../constants/gifsActionTypes';

const initialState = Map({
  isGifsFetching: true,
  gifs: Map({
    results: List(),
    next: null,
    previous: null,
  }),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GIFS_FETCH_BEGINS: {
      return state.set('isGifsFetching', true);
    }
    case GIFS_FETCH_FINISHED: {
      const results = action.data.results.map(
        item => {
          return renameKeys(item, {'gif_file': 'src'})
        }
      );

      const obj = Map({
        isGifsFetching: false,
        gifs: fromJS(action.data).merge(
          Map({
            results: state.get('gifs').get('results').concat(fromJS(results)),
          })
        )
      });

      return state.merge(obj);
    }
    default:
      return state;
  }
};

