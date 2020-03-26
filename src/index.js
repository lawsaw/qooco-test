import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { App } from './containers';
import './styles/styles.scss';
import './styles/table.scss';
import theme from './helpers/theme';
import * as serviceWorker from './serviceWorker';

function Root() {
    return (
        <MuiThemeProvider
            theme={theme}
        >
            <CssBaseline />
            <App />
        </MuiThemeProvider>
    )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
