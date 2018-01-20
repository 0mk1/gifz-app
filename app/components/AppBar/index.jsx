import React from 'react';
import PropTypes from 'prop-types';
import { AppBar as MaterialAppBar } from 'material-ui';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


import './appbar.css';


const AppBar = () => {
  return (
    <MaterialAppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          Gifz
        </Typography>
      </Toolbar>
    </MaterialAppBar>
  );
}

AppBar.propTypes = {};

export default AppBar;
