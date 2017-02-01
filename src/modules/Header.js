import React from 'react';
import { AppBar } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import { withRouter } from 'react-router';

import routes from '../utils/routes';

const getTitle = (path) => {
  if (path === '/') {
    return routes[0].name;
  }

  const foundRoute = routes.find((route) => {
    if (route.path === path) {
      return route.name;
    }
  });

  if (foundRoute) {
    return foundRoute.name;
  } else {
    console.warn(`No title found for path '${path}'`);
    console.warn('Make sure the title name is defined in src/routes.js');
    return `ERROR: Title not found for path: ${path}`;
  }
}

const Header = ({ path, toggleDrawer }) => (
  <header>
    <AppBar title={<FormattedMessage id={ getTitle(path) } /> }
            onLeftIconButtonTouchTap={() => toggleDrawer()} />
  </header>
)

import { connect } from 'react-redux';

import { toggleDrawer } from './MenuDrawer';

export default withRouter(connect(
  (state, ownProps) => ({
    path: ownProps.location.pathname
  }),
  (dispatch) => ({
    toggleDrawer() {
      dispatch(toggleDrawer());
    }
  })
)(Header));
