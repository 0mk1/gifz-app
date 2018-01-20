import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  AppBar,
  GifGrid,
  Loader,
} from '../../components';


class GifsContainer extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <GifGrid />
        <Loader />
      </div>
    );
  }
}

GifsContainer.propTypes = {

};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifsContainer);
