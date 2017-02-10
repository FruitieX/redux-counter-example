import Offline from 'offline-plugin/runtime'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import routes from './utils/routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
try {
  injectTapEventPlugin();
} catch (e) {
  // ignore errors
  // otherwise we break hot reloading
}

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import store from './utils/store'
import theme from './utils/theme';
const muiTheme = getMuiTheme(theme);

import { IntlProvider } from 'react-intl-redux';
import { language, messages } from './utils/intl';

import MenuDrawer from './modules/MenuDrawer';
import Header from './modules/Header';

import Login from './modules/Login'
import ErrorSnackbar from './modules/ErrorSnackbar'

if (process.env.NODE_ENV === 'production') {
  Offline.install({
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },

    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      Offline.applyUpdate();
    },

    onUpdated: () => {
      console.log('SW Event:', 'onUpdated');
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    }
  });
}

// Route that will only render if authenticated
const AuthRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().auth.data.token ? (
      React.createElement(component, props)
    ) : (
      null
    )
  )}/>
)

// Route that will redirect to /login if not authenticated
const AuthRedirectRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().auth.data.token ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <IntlProvider>
        <Router>
          <div>
            <AuthRoute component={MenuDrawer} />
            <AuthRoute component={Header} />
            <AuthRoute component={ErrorSnackbar} />

            <Route exact path='/login' component={Login} />

            {
              routes.map((route, index) => (
                <AuthRedirectRoute exact key={index} path={route.path} component={route.component} />
              ))
            }

            <AuthRedirectRoute exact path='/' component={routes[0].component} />
          </div>
        </Router>
      </IntlProvider>
    </MuiThemeProvider>
  </Provider>
)

if (!module.hot) render(<Root />, document.querySelector('react'))
