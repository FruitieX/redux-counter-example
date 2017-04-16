// Disable prop type checking in modules
/* eslint-disable react/prop-types */

import React from 'react';

import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { clearState } from '../utils/persist';

const mapDispatchToProps = () => ({
  doLogout() {
    clearState();

    // reload app
    location.pathname = '/';
  },
});

@connect(undefined, mapDispatchToProps)
export default class Logout extends React.Component {
  componentDidMount() {
    this.props.doLogout();
  }

  render() {
    return (
      <div
        style={{
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '200px',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}
