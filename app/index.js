import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';

import configureStore from './store';
import configureRequests from './requests';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

import {
  AppBar,
} from './components';

import {
  GifsList,
} from './containers';

import './styles/base.css';


const store = configureStore();
configureRequests();


const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div className="app-container">
        <Reboot />
        <AppBar />
        <GifsList />
      </div>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
