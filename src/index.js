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

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { store } from './utils/store'
import theme from './utils/theme';
const muiTheme = getMuiTheme(theme);

import { IntlProvider } from 'react-intl';
import { language, messages } from './utils/intl';

import MenuDrawer from './modules/MenuDrawer';
import Header from './modules/Header';

import Login from './modules/Login'
import Logout from './modules/Logout'
import Home from './modules/Home'

if (process.env.NODE_ENV === 'production') Offline.install()

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
      <IntlProvider
        locale={language}
        key={language}
        messages={messages}
      >
        <Router>
          <div>
            <AuthRoute component={MenuDrawer} />
            <AuthRoute component={Header} />

            <Route exact path='/login' component={Login} />

            <AuthRedirectRoute exact path='/logout' component={Logout} />
            <AuthRedirectRoute exact path='/' component={Home} />
          </div>
        </Router>
      </IntlProvider>
    </MuiThemeProvider>
  </Provider>
)

if (!module.hot) render(<Root />, document.querySelector('react'))
