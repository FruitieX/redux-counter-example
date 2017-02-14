import React from 'react';
import AppBar from 'material-ui/AppBar';
import { FormattedMessage } from 'react-intl';

import { withRouter } from 'react-router';

import { connect } from 'react-redux';

import { toggleDrawer } from './MenuDrawer';
import routes from '../utils/routes';

const getTitle = (path) => {
  if (path === '/') {
    return routes[0].name;
  }

  const foundRoute = routes.find(route => (
    route.path === path ? route.name : null
  ));

  if (foundRoute) {
    return foundRoute.name;
  }
  console.warn(`No title found for path '${path}'`);
  console.warn('Make sure the title name is defined in src/routes.js');
  return `ERROR: Title not found for path: ${path}`;
};

const Header = ({ path, doToggleDrawer }) => (
  <header>
    <AppBar
      title={<FormattedMessage id={getTitle(path)} />}
      onLeftIconButtonTouchTap={() => doToggleDrawer()}
    />
  </header>
);

Header.propTypes = {
  path: React.PropTypes.string.isRequired,
  doToggleDrawer: React.PropTypes.func.isRequired,
};

export default withRouter(connect(
  (state, ownProps) => ({
    path: ownProps.location.pathname,
  }),
  dispatch => ({
    doToggleDrawer() {
      dispatch(toggleDrawer());
    },
  }),
)(Header));
