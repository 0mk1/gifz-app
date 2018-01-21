import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  InfiniteScrollImageGrid,
  Loader,
} from '../../components';

import { fetchGifs } from '../../actions/gifsActions';


class GifsList extends Component {
  componentDidMount() {
      this.props.fetchGifs();
  }
  loadMore() {
    if (this.props.gifs.get('next') !== null) {
      const cursorRegExp = new RegExp('cursor=(.+)&?');
      const cursor = cursorRegExp.exec(this.props.gifs.get('next'))[1];
      this.props.fetchGifs({ cursor });
    }
  }
  render() {
    let loader = null;
    if (this.props.isGifsFetching) {
      loader = <Loader />;
    }

    return (
      <div>
        <InfiniteScrollImageGrid
          items={this.props.gifs.get('results')}
          onScrollEnd={this.loadMore.bind(this)}
          isLoading={this.props.isGifsFetching}
        />
        {loader}
      </div>
    );
  }
}

GifsList.propTypes = {
  isGifsFetching: PropTypes.bool.isRequired,
  gifs: PropTypes.shape({
    get: PropTypes.func,
  }).isRequired,
  fetchGifs: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isGifsFetching: state.gifs.get('isGifsFetching'),
  gifs: state.gifs.get('gifs'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGifs,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifsList);
